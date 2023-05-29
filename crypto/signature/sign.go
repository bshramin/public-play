package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	b64 "encoding/base64"
	"encoding/hex"
	"encoding/pem"
	"fmt"
	"os"
)

func main() {
	// Generate RSA key pair
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println("Failed to generate RSA key pair:", err)
		return
	}

	printPublicKey(*privateKey)

	// Create a message to sign
	message := []byte("Hello, World!")

	// Calculate the hash of the message
	hashed := sha256.Sum256(message)

	// Sign the hash using the private key
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hashed[:])
	if err != nil {
		fmt.Println("Failed to sign the message:", err)
		return
	}

	hashedHex := hex.EncodeToString(hashed[:])
	fmt.Println("Hashed:", hashedHex)

	sEnc := b64.StdEncoding.EncodeToString(signature)
	// Print the signature as a base64-encoded string
	fmt.Println("Signature Base64:", sEnc)

	str := hex.EncodeToString(signature)
	fmt.Println("Signature HEX:", str)
}

func printPublicKey(privateKey rsa.PrivateKey) {

	// Extract the public key from the private key
	publicKey := privateKey.PublicKey

	// Marshal the public key to DER format
	publicKeyBytes, err := x509.MarshalPKIXPublicKey(&publicKey)
	if err != nil {
		fmt.Println("Failed to marshal public key:", err)
		return
	}

	// Create a PEM block for the public key
	pemBlock := &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: publicKeyBytes,
	}

	// Write the PEM block to stdout
	err = pem.Encode(os.Stdout, pemBlock)
	if err != nil {
		fmt.Println("Failed to encode PEM block:", err)
		return
	}
}
