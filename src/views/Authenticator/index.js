import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { useState } from 'react'

const Authenticator = () => {
    

    const [dataQR, setDataQr] = useState('')
    const [token, setToken] = useState('')
    const [secret, setSecret] = useState({})

    return (
        <div>
            Authentication page
            <button onClick={() => {
               const verified = speakeasy.totp.verify({ secret: secret.ascii,
                encoding: 'ascii',
                token })
                console.log('verfifie', verified, token)
            }}>Verify 1</button>

<button onClick={() => {
              const token = speakeasy.totp({
                secret: secret.ascii,
                encoding: 'ascii'
              })
              console.log(token)
            }}>Verfiy 2</button>

<button onClick={() => {
               const secret = speakeasy.generateSecret()
               console.log(secret)
               setSecret(secret)
            }}>Generate secret</button>


            <button onClick={() => {


                // Get the data URL of the authenticator URL
                QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
                    console.log(data_url)

                    // Display this data URL to the user in an <img> tag
                    // Example:
                    // write(`<img src="${data_url}">`)
                    setDataQr(data_url)
                })
            }}>Generate qr</button>

            <img src={dataQR}/>

            <input onChange={(e) => setToken(e.target.value)}/>
        </div>
    )
}

export default Authenticator