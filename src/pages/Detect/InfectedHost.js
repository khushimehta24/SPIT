import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function InfectedHost() {
    return (
        <>
            <h3>Infected Host</h3>
            <p style={{ fontSize: '12px' }}>nfected hosts on a network refer to devices that have been compromised by malware or some other type of security threat. These devices can be infected with a variety of malicious software, including viruses, worms, trojans, or other types of malware.Once a host is infected, the attacker can use it to carry out malicious activities, such as stealing sensitive information, spreading malware to other devices on the network, or launching attacks on other systems</p>
            <UploadImg list1={['Robust firewall',
                'Limit user privileges',
                'Network access control',
                'Network segmentation']}
                list2={['A firewall helps prevent unauthorized access to the network and can block malicious traffic.',
                    'By limiting user privileges, you can reduce the damage that malware can do if it infects a host.',
                    `Network access control can be used to restrict access to the network based on certain criteria, such as the type of device being used or the user's location.`,
                    'Segmenting the network into smaller subnets can help prevent the spread of malware within the network.']} />


        </>
    )
}

export default InfectedHost