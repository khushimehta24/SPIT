import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function Ex3() {
    return (
        <>
            <h3>Discover Data Exfiltration 3</h3>
            <p style={{ fontSize: '12px' }}>Discover Data Exfiltration 3 refers to some assailant grabbing all the employee and vendor email addresses, and sending them out on a channel normally reserved for other uses. This is similar to attackers abusing DNS for data exfiltration. One host is sending out much more data on a some port from the enterprise than other hosts do, different from the hosts in 1 and 2.</p>
            <UploadImg
                list1={['Network Segmentation',
                    'Network Traffic',
                    'Email Security Solutions',
                    'Response Plan']}
                list2={['Segment the network so that sensitive data is separated from the rest of the network and access to that data is restricted to authorized users',
                    'Regularly monitor the network traffic to detect and prevent unusual patterns of data transfer.',
                    'Implement email security solutions such as email encryption, anti-spam and anti-malware filters to protect against phishing and other types of email-based attacks.',
                    'Have a response plan in place to quickly detect and respond to security incidents. This includes regular backups of sensitive data.']} />


        </>
    )
}

export default Ex3