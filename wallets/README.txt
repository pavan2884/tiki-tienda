
User public - 4WVKWGwNQhLmJugfAZSjA9yV62a3erreaPn9zzvVeXvP

Store wallet public - By4VVtPCL2iSEHYEzbaGN8EWhQqFD8vKwYuQXS14evrm

Tix wallet public - 5DmXEwKpxkDtMc1oz4uQZfotxKm3f4r94sw8BaWgyrrE
Tix Mint - fBpjWNKLDNwKRXM7ZLMEKTFFLxuCaXLNV3dNYp8jdEu


NFT creation and transfer - commands and sample output
======================================================

spl-token --config wallets/nft/config.yml create-token --decimals 0
    6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo
spl-token --config wallets/nft/config.yml create-account 6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo
    9yNEigMGbwnaqGxmNw9B2j6gkEdKuwp2MRLXuheW8aho
spl-token --config wallets/nft/config.yml mint 6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo 1 9yNEigMGbwnaqGxmNw9B2j6gkEdKuwp2MRLXuheW8aho
spl-token --config wallets/nft/config.yml authorize 6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo mint --disable
spl-token --config wallets/nft/config.yml accounts -v 6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo
spl-token --config wallets/nft/config.yml transfer 6TZyQ1L1XziS2gKNFjjxvVDgqMen1rYW8gvvErgKtfDo 1 4WVKWGwNQhLmJugfAZSjA9yV62a3erreaPn9zzvVeXvP
