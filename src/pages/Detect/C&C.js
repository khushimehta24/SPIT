import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function CandC() {
    return (
        <>
            <h3>Private Command and Control Channel</h3>
            <p style={{ fontSize: '12px' }}>Command and Control (C2) attacks refer to a type of cyber attack where an attacker gains access to a target network and establishes a communication channel to remotely control and execute malicious commands on the infected devices. These attacks are often carried out through malware, which allows the attacker to access and steal sensitive information, execute malicious payloads, and maintain persistence within the target network. The objective of C2 attacks is to maintain stealth and persistently control the compromised devices to carry out further attacks.</p>
            <UploadImg />


        </>
    )
}

export default CandC