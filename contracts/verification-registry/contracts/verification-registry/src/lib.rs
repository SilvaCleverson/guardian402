#![no_std]
use soroban_sdk::{
    contract, contractevent, contractimpl, contracttype, Address, BytesN, Env,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct VerificationRecord {
    pub document_hash: BytesN<32>,
    pub registered_at: u64,
    pub active: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum VerificationStatus {
    Authentic,
    Mismatch,
    NotFound,
    Revoked,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    Initialized,
    Record(BytesN<32>),
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Registered {
    #[topic]
    pub record_key: BytesN<32>,
    pub document_hash: BytesN<32>,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Revoked {
    #[topic]
    pub record_key: BytesN<32>,
}

#[contract]
pub struct VerificationRegistry;

#[contractimpl]
impl VerificationRegistry {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Initialized) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Initialized, &true);
        env.storage().instance().extend_ttl(100_000, 100_000);
    }

    pub fn register(env: Env, admin: Address, record_key: BytesN<32>, document_hash: BytesN<32>) {
        Self::require_admin(&env, &admin);
        let record = VerificationRecord {
            document_hash: document_hash.clone(),
            registered_at: env.ledger().timestamp(),
            active: true,
        };
        env.storage()
            .persistent()
            .set(&DataKey::Record(record_key.clone()), &record);
        env.storage()
            .persistent()
            .extend_ttl(&DataKey::Record(record_key.clone()), 100_000, 100_000);
        Registered {
            record_key,
            document_hash,
        }
        .publish(&env);
    }

    pub fn verify(env: Env, record_key: BytesN<32>, document_hash: BytesN<32>) -> VerificationStatus {
        let key = DataKey::Record(record_key);
        let Some(record) = env
            .storage()
            .persistent()
            .get::<DataKey, VerificationRecord>(&key)
        else {
            return VerificationStatus::NotFound;
        };

        if !record.active {
            return VerificationStatus::Revoked;
        }

        if record.document_hash == document_hash {
            VerificationStatus::Authentic
        } else {
            VerificationStatus::Mismatch
        }
    }

    pub fn revoke(env: Env, admin: Address, record_key: BytesN<32>) {
        Self::require_admin(&env, &admin);
        let key = DataKey::Record(record_key.clone());
        let mut record: VerificationRecord = env
            .storage()
            .persistent()
            .get(&key)
            .unwrap_or_else(|| panic!("record not found"));
        record.active = false;
        env.storage().persistent().set(&key, &record);
        Revoked { record_key }.publish(&env);
    }

    pub fn get(env: Env, record_key: BytesN<32>) -> Option<VerificationRecord> {
        env.storage()
            .persistent()
            .get(&DataKey::Record(record_key))
    }

    fn require_admin(env: &Env, admin: &Address) {
        let stored: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .unwrap_or_else(|| panic!("not initialized"));
        if admin != &stored {
            panic!("unauthorized");
        }
        admin.require_auth();
    }
}

mod test;
