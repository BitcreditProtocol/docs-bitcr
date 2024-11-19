<template><div><h1 id="e-bill" tabindex="-1"><a class="header-anchor" href="#e-bill"><span>E-bill</span></a></h1>
<h2 id="cryptographic-primitives" tabindex="-1"><a class="header-anchor" href="#cryptographic-primitives"><span>cryptographic primitives</span></a></h2>
<h3 id="ed25519-for-the-logic-in-the-dht" tabindex="-1"><a class="header-anchor" href="#ed25519-for-the-logic-in-the-dht"><span>ed25519 for the logic in the DHT</span></a></h3>
<h3 id="rsa-2048-for-encryption" tabindex="-1"><a class="header-anchor" href="#rsa-2048-for-encryption"><span>RSA (2048) for encryption</span></a></h3>
<h3 id="secp256k1-for-signatures-as-well-as-generating-bitcoin-addresses-for-nodes-and-bills" tabindex="-1"><a class="header-anchor" href="#secp256k1-for-signatures-as-well-as-generating-bitcoin-addresses-for-nodes-and-bills"><span>secp256k1 for signatures, as well as generating Bitcoin addresses for nodes and bills</span></a></h3>
<h2 id="identity-record" tabindex="-1"><a class="header-anchor" href="#identity-record"><span>identity record</span></a></h2>
<h3 id="field-description" tabindex="-1"><a class="header-anchor" href="#field-description"><span>field description</span></a></h3>
<h3 id="key-pairs-and-their-generation" tabindex="-1"><a class="header-anchor" href="#key-pairs-and-their-generation"><span>key pairs and their generation</span></a></h3>
<h3 id="node-id" tabindex="-1"><a class="header-anchor" href="#node-id"><span>node id</span></a></h3>
<h3 id="dht-identity-creation-event-and-its-promotion" tabindex="-1"><a class="header-anchor" href="#dht-identity-creation-event-and-its-promotion"><span>DHT identity creation event and its promotion</span></a></h3>
<h3 id="identity-restore-transfer" tabindex="-1"><a class="header-anchor" href="#identity-restore-transfer"><span>identity restore/transfer</span></a></h3>
<h3 id="upload-backup-user-material-from-system" tabindex="-1"><a class="header-anchor" href="#upload-backup-user-material-from-system"><span>upload (backup) user material from system</span></a></h3>
<h2 id="adding-another-node-to-the-contact-book-and-exchanging-data" tabindex="-1"><a class="header-anchor" href="#adding-another-node-to-the-contact-book-and-exchanging-data"><span>adding another node to the contact book and exchanging data</span></a></h2>
<h2 id="content-of-bill" tabindex="-1"><a class="header-anchor" href="#content-of-bill"><span>content of bill</span></a></h2>
<h3 id="field-description-1" tabindex="-1"><a class="header-anchor" href="#field-description-1"><span>field description</span></a></h3>
<h3 id="uploading-of-attached-files" tabindex="-1"><a class="header-anchor" href="#uploading-of-attached-files"><span>uploading of attached files</span></a></h3>
<h3 id="bill-key-pairs" tabindex="-1"><a class="header-anchor" href="#bill-key-pairs"><span>bill key pairs</span></a></h3>
<h3 id="topic-creation-in-the-dht" tabindex="-1"><a class="header-anchor" href="#topic-creation-in-the-dht"><span>topic creation in the DHT</span></a></h3>
<h3 id="bill-example" tabindex="-1"><a class="header-anchor" href="#bill-example"><span>bill example</span></a></h3>
<h3 id="bill-blockchain-and-its-consensus" tabindex="-1"><a class="header-anchor" href="#bill-blockchain-and-its-consensus"><span>bill blockchain and its consensus</span></a></h3>
<h3 id="download-pdf-version-of-bill" tabindex="-1"><a class="header-anchor" href="#download-pdf-version-of-bill"><span>download PDF version of bill</span></a></h3>
<h2 id="roles-in-the-bill" tabindex="-1"><a class="header-anchor" href="#roles-in-the-bill"><span>roles in the bill</span></a></h2>
<h3 id="drawer" tabindex="-1"><a class="header-anchor" href="#drawer"><span>Drawer</span></a></h3>
<h3 id="drawee" tabindex="-1"><a class="header-anchor" href="#drawee"><span>Drawee</span></a></h3>
<h3 id="payee" tabindex="-1"><a class="header-anchor" href="#payee"><span>Payee</span></a></h3>
<h3 id="payer" tabindex="-1"><a class="header-anchor" href="#payer"><span>Payer</span></a></h3>
<h3 id="holder" tabindex="-1"><a class="header-anchor" href="#holder"><span>Holder</span></a></h3>
<h3 id="endorser" tabindex="-1"><a class="header-anchor" href="#endorser"><span>Endorser</span></a></h3>
<h3 id="endorsee" tabindex="-1"><a class="header-anchor" href="#endorsee"><span>Endorsee</span></a></h3>
<h3 id="seller" tabindex="-1"><a class="header-anchor" href="#seller"><span>Seller</span></a></h3>
<h3 id="byuer" tabindex="-1"><a class="header-anchor" href="#byuer"><span>Byuer</span></a></h3>
<h3 id="guarantor" tabindex="-1"><a class="header-anchor" href="#guarantor"><span>Guarantor</span></a></h3>
<ul>
<li>local build
<ul>
<li>configuration and startup parameters</li>
<li>software installation</li>
</ul>
</li>
<li>user documentation
<ul>
<li>current user interface with screenshots</li>
<li>settings in the Bill application</li>
<li>map of the journey</li>
</ul>
</li>
<li>description of each operation with screenshots and a separate deep dive section
<ul>
<li>issue
<ul>
<li>2 party bill</li>
<li>3 party bill</li>
<li>field description</li>
<li>communication channels (intro)</li>
</ul>
</li>
<li>accept
<ul>
<li>difference of 2 and 3 party bill</li>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>request to accept
<ul>
<li>difference of 2 and 3 party bill</li>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>sale
<ul>
<li>how the address for money transfer is generated</li>
<li>validity period of the offer for sale</li>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>buy
<ul>
<li>validity period of the offer for sale</li>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>request to pay
<ul>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>pay
<ul>
<li>how the address for money transfer is generated</li>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>receiving payment
<ul>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
<li>recourse
<ul>
<li>who can perform this action and when</li>
<li>field description</li>
<li>rules of action (to whom the action can be directed)</li>
</ul>
</li>
<li>endorse
<ul>
<li>who can perform this action and when</li>
<li>field description</li>
</ul>
</li>
</ul>
</li>
<li>storage layer
<ul>
<li>data storage method description
<ul>
<li>local</li>
<li>on relay</li>
</ul>
</li>
<li>DHT
<ul>
<li>links to libp2p library</li>
<li>how we use the DHT</li>
<li>how a node joins the DHT</li>
<li>how a node puts and receives events and parse data</li>
<li>topics</li>
</ul>
</li>
<li>Nostr
<ul>
<li>why we migrated to Nostr</li>
<li>how we use Nostr</li>
<li>who acts as a relay</li>
<li>what data the relay stores and how</li>
<li>event description</li>
</ul>
</li>
</ul>
</li>
<li>transport layer
<ul>
<li>DHT
<ul>
<li>who acts as a relay</li>
<li>DCUtR</li>
<li>topics</li>
</ul>
</li>
<li>Nostr
<ul>
<li>why we migrated to Nostr</li>
<li>who acts as a relay</li>
</ul>
</li>
</ul>
</li>
<li>technical consensus of the protocol</li>
<li>terms of use</li>
<li>FAQ</li>
<li>glossary</li>
</ul>
</div></template>


