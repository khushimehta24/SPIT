import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function Botnet() {
    return (
        <>
            <h3>Botnet</h3>
            <p style={{ fontSize: '12px' }}>A botnet is a network of compromised computers, also known as "bots," that are controlled remotely by a single attacker or a group of attackers. Botnets can be used for a variety of malicious purposes, such as sending spam messages, launching distributed denial of service (DDoS) attacks, stealing sensitive information, and spreading malware.</p>
            <UploadImg list1={['Keep your software and operating systems up-to-date',
                'Use a reputable antivirus program',
                'Be cautious when downloading files and emails',
                'Use strong passwords']}
                list2={['Make sure to install software updates, as they often include security patches that address known vulnerabilities.',
                    'A good antivirus program can detect and remove malware, including botnets.',
                    'Avoid opening emails or links from unknown or suspicious sources, and be cautious when downloading files from the internet.',
                    'Use a strong, unique password for each account and enable two-factor authentication when possible.']} />


        </>
    )
}

export default Botnet