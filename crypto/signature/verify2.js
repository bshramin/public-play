function f() {
  const crypto = require("crypto");

  const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArN8Pizd3Mwj0IAkPyD7W
1wvgTz40+w7WJG8gDXZ2m3adAo4fW+83NsLRSpmJzIStW9UJl1Y3gAbfHXvXn78E
52JBmi8kbrvSWMJwNWnTsAkiU974rheHADAM24dnnsmMlc78M+J9PY+nlNDpEl+g
8/v3sir/8EWDhH8R5q2DAQmR/hYTUL2N5rR86H2/9sUDFx1a5L67d1tR8wJxjMa3
QEMdzW823e9jSMdOwoVM4esnXbaob+IaaSZROCDfOlhBAHuWHlGla0QnoVT7cdAK
iWOOyZDfbeVAF0lihIDNYlTZCqRusD5grSpGHXisB0IAfwgLYXbP9GvBX7aCryMZ
4QIDAQAB
-----END PUBLIC KEY-----`; // NOTE: This is the staging public key

  const bundle = {
    cleanedRequest: {
      signature:
        "hbnDwFwd3Ci0QpCbRxlC30csbc7Hw0HJCPqSjylVjpsnvQt8IUw3/9SfBrRS5Jnm8WbOY75Ebr6FMjm7a8p6uj6UxmzeHHhXgPg3svxORO08JzrYfiVVXIbv7NooL4qiWy105TAswf9AjmRkfe5XklYxeou1eAskNwKlETbd58jhXKQzh/MRkQf/lX5CITMSy+QieJrgRKiL9mzvOfou8NKt8vG/hi6Oei5wMakD/HfzqVZDVBH/mvTvPyc49rgeyDA0bdXzkKO0CV8eplG/ljb6qg+g+1kfKvUueuQmEEYpeujXWvgb70Ws3tLhPXeCUuNhwnlyATYZ9sB0ZYQjAw==",
      data: JSON.parse(
        '{"time":"2023-06-14T23:59:39.894438529Z","email":"amin@gmail.com"}'
      ),
    },
  };

  const signature = bundle.cleanedRequest.signature;
  const signatureBuffer = Buffer.from(signature, "base64");
  const data = bundle.cleanedRequest.data;
  const stringData = JSON.stringify(data);
  const encoder = new TextEncoder();
  const bytesData = encoder.encode(stringData);

  const publicKey = crypto.createPublicKey(publicKeyPem);

  const isVerified = crypto.verify(
    "sha256",
    bytesData,
    publicKey,
    signatureBuffer
  );
  if (isVerified) {
    return [data];
  } else {
    throw new Error("Invalid signature");
  }
}

console.log(f());
