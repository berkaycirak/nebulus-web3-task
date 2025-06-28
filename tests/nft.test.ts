// import {
// 	createNft,
// 	findMasterEditionPda,
// 	findMetadataPda,
// 	mplTokenMetadata,
// 	verifySizedCollectionItem,
// } from '@metaplex-foundation/mpl-token-metadata';
// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
// import {
// 	KeypairSigner,
// 	createSignerFromKeypair,
// 	generateSigner,
// 	keypairIdentity,
// 	percentAmount,
// } from '@metaplex-foundation/umi';
// import * as anchor from '@coral-xyz/anchor';
// import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

// describe('Verified NFT Creation', () => {
// 	const provider = anchor.AnchorProvider.env();
// 	anchor.setProvider(provider);

// 	const connection = provider.connection;
// 	const umi = createUmi(provider.connection);
// 	const payer = provider.wallet as NodeWallet;

// 	let collectionMint: KeypairSigner;

// 	const creatorWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(payer.payer.secretKey));
// 	const creator = createSignerFromKeypair(umi, creatorWallet);

// 	before(async () => {
// 		umi.use(keypairIdentity(creator));
// 		umi.use(mplTokenMetadata());

// 		// Create collection for test
// 		collectionMint = generateSigner(umi);
// 		await createNft(umi, {
// 			mint: collectionMint,
// 			name: 'Test Collection',
// 			symbol: 'TC',
// 			uri: 'https://gateway.irys.xyz/4kiTKmewCHT6gQVm7S4Sb7jUbTXXx4Dk636fga4qAVq2',
// 			sellerFeeBasisPoints: percentAmount(5),
// 			collectionDetails: { __kind: 'V1', size: 50 },
// 		}).sendAndConfirm(umi);

// 		console.log(`Collection created: ${collectionMint.publicKey.toString()}`);
// 	});

// 	it('should create and verify 50 NFTs in collection', async () => {
// 		const collectionMetadata = findMetadataPda(umi, { mint: collectionMint.publicKey });
// 		const collectionMasterEdition = findMasterEditionPda(umi, { mint: collectionMint.publicKey });

// 		const nfts = [];

// 		for (let i = 1; i <= 50; i++) {
// 			const mint = generateSigner(umi);

// 			// Create NFT with unverified collection
// 			await createNft(umi, {
// 				mint,
// 				name: `NFT #${i}`,
// 				symbol: 'NFT',
// 				uri: `https://gateway.irys.xyz/BNAgYykqDBeyA4uadtSAhr61LN8LfCf9o6qi9qTx5JBz`,
// 				sellerFeeBasisPoints: percentAmount(5),
// 				collection: { verified: false, key: collectionMint.publicKey },
// 			}).sendAndConfirm(umi);

// 			// Verify the NFT in collection
// 			const nftMetadata = findMetadataPda(umi, { mint: mint.publicKey });

// 			const verifyTx = await verifySizedCollectionItem(umi, {
// 				collectionAuthority: creator,
// 				collectionMint: collectionMint.publicKey,
// 				collection: collectionMetadata,
// 				collectionMasterEditionAccount: collectionMasterEdition,
// 				metadata: nftMetadata,
// 			}).sendAndConfirm(umi);

// 			nfts.push({
// 				id: i,
// 				mint: mint.publicKey.toString(),
// 				createTx: 'created',
// 				verifyTx: verifyTx.signature.toString(),
// 			});

// 			console.log(`Created and verified NFT #${i}: ${mint.publicKey.toString()}`);
// 		}

// 		console.log(`Successfully created and verified ${nfts.length} NFTs`);
// 		console.log('All NFTs:', nfts);
// 	});
// });
