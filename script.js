// The Ethereum smart contract address
const contractAddress = '0xDb4f41EAc7CCaF723Cc60F9BD1fA488d6A89064a';

// The ABI (Application Binary Interface) of the smart contract
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "enum messageSystem.Designation",
				"name": "_isWho",
				"type": "uint8"
			}
		],
		"name": "addMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "deleteMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "downMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "enum messageSystem.Designation",
				"name": "_senderDesignation",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum messageSystem.Designation",
				"name": "_to",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "downMessageLog",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "horizontalMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "enum messageSystem.Designation",
				"name": "_senderDesignation",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum messageSystem.Designation",
				"name": "_to",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "horizontalMessageLog",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "upMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "enum messageSystem.Designation",
				"name": "_senderDesignation",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum messageSystem.Designation",
				"name": "_to",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "upMessageLog",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"internalType": "enum messageSystem.Designation",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

// Function to connect to the wallet

async function connect() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);
            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}

// Add event listener to connect button
let connectToWallet = document.querySelector("#connect");
connectToWallet.addEventListener("click", connect);

// Function to add a member to the smart contract
async function addMember() {
    const address = document.getElementById('addMemberAddress').value;
    const designation = document.getElementById('designation').value;

    try {
        const tx = await contract.addMember(address, designation);
        await tx.wait();
        alert('Member added successfully');
    } catch (error) {
        console.error(error);
        alert('Failed to add member');
    }
}

async function removeMember() {
	const address = document.getElementById('deleteMemberAddress').value;

	try {
		const tx = await contract.deleteMember(address);
		await tx.wait();
		alert("Member deleted successfully");
	} catch (error){
		console.log(error);
		alert("Failed to remove memeber");
	}
}

// Function to send an "up message" to the smart contract
async function sendUpMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
        const tx = await contract.upMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        
        console.log(`message from Faculity To Hod : ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Function to send a "down message" to the smart contract
async function sendDownMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
        const tx = await contract.downMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        
        console.log(`message from Hod To Faculity : ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Function to send a "horizontal message" to the smart contract
	async function sendHorizontalMessage() {
    const address = document.getElementById('messageAddress').value;
    const message = document.getElementById('message').value;

    try {
        // Get the sender's address
        const senderAddress = await signer.getAddress();

        // Get the sender's designation from the contract
        const senderDesignationIndex = await contract.members(senderAddress);
        const senderDesignation = getDesignationName(senderDesignationIndex);

        // Get the recipient's designation from the contract
        const recipientDesignationIndex = await contract.members(address);
        const recipientDesignation = getDesignationName(recipientDesignationIndex);

        // Call the smart contract function to send a horizontal message
        const tx = await contract.horizontalMessage(address, message);
        await tx.wait();
        alert('Message sent successfully');
        
        console.log(`Message from ${senderDesignation} to ${recipientDesignation}: ${message}`);
    } catch (error) {
        console.error(error);
        alert('Failed to send message');
    }
}

// Helper function to convert designation index to name
function getDesignationName(index) {
    if (index === 0) return 'HOD';
    if (index === 1) return 'Faculty';
    return 'Unknown';
}