# docs.bitcr
Bitcredit documentation

## Bill
* cryptographic primitives
    * ed25519 for the logic in the DHT
    * RSA (2048) for encryption
    * secp256k1 for signatures, as well as generating Bitcoin addresses for nodes and bills
* identity record
    * field description
    * key pairs and their generation
    * node id
    * DHT identity creation event and its promotion
    * identity restore/transfer
    * upload (backup) user material from system
* adding another node to the contact book and exchanging data
* content of bill
    * field description
    * uploading of attached files
    * bill key pairs
    * topic creation in the DHT
    * bill example
    * bill blockchain and its consensus
    * download PDF version of bill
* roles in the bill
    * Drawer
    * Drawee
    * Payee
    * Payer
    * Holder
    * Endorser
    * Endorsee
    * Seller
    * Byuer
    * Guarantor 
* local build
    * configuration and startup parameters
    * software installation
* user documentation
    * current user interface with screenshots
    * settings in the Bill application
    * map of the journey
* description of each operation with screenshots and a separate deep dive section
    * issue
        * 2 party bill
        * 3 party bill
        * field description
        * communication channels (intro)
    * accept
        * difference of 2 and 3 party bill
        * who can perform this action and when
        * field description
    * request to accept
        * difference of 2 and 3 party bill
        * who can perform this action and when
        * field description
    * sale
        * how the address for money transfer is generated
        * validity period of the offer for sale
        * who can perform this action and when
        * field description
    * buy
        * validity period of the offer for sale
        * who can perform this action and when
        * field description
    * request to pay
        * who can perform this action and when
        * field description
    * pay
        * how the address for money transfer is generated
        * who can perform this action and when
        * field description
    * receiving payment
        * who can perform this action and when
        * field description
    * recourse
        * who can perform this action and when
        * field description
        * rules of action (to whom the action can be directed)
    * endorse
        * who can perform this action and when
        * field description
* storage layer
    * data storage method description
        * local
        * on relay
    * DHT
        * links to libp2p library
        * how we use the DHT
        * how a node joins the DHT
        * how a node puts and receives events and parse data
        * topics
    * Nostr
        * why we migrated to Nostr
        * how we use Nostr
        * who acts as a relay
        * what data the relay stores and how
        * event description
* transport layer
    * DHT
        * who acts as a relay
        * DCUtR
        * topics
    * Nostr
        * why we migrated to Nostr
        * who acts as a relay
* technical consensus of the protocol
* terms of use
* FAQ
* glossary

## Wildcat mint
