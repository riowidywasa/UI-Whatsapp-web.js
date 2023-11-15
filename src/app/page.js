"use client";
import { io } from 'socket.io-client';
import styles from './page.module.css'
import QRCode from "react-qr-code";
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3002", {})
export default function Home() {
  const [session, setSession] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [message, setMessage] = useState("")
  const createSessionForWhaatsapp = () => {
    // ganti session menjadi name dari admin
    socket.emit("createSession", { id: "admin" })
  }



  useEffect(() => {
    socket.emit("connected", "hello from client");
    socket.on("message", (msg) => {
      console.log(msg);
      setMessage(msg)
    })

    socket.on("qr", (data) => {
      console.log(data);
      const { qr } = data
      console.log("QR RECEIVED", qr);
      setQrCode(qr);
    })
  }, [])

  console.log(qrCode);

  return (
    <main className={styles.main}>

      <div>
        <h1>Whatsapp Web Js client</h1>
        <h1>QR CODE</h1>

        <div style={{ marginBottom: "40px" }}>
        <h1>Test {message}</h1>
          <input type='text' value={session} onChange={(e) => {
            setSession(e.target.value)
          }} />
          <br /> <br />
          <button onClick={createSessionForWhaatsapp}>Create Session</button>
          <br /> <br />
        
          <br /> <br />
          <QRCode value={qrCode}></QRCode>
        </div>
      </div>
    </main>
  )
}
