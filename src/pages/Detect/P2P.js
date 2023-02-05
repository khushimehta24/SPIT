import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function P2P() {
    return (
        <>
            <h3>Internal Peer 2 Peer</h3>
            <p style={{ fontSize: '12px' }}>Internal P2P (Peer-to-Peer) attacks refer to malicious activities that occur within a P2P network, where peer devices communicate and share data directly with each other.These can be of different types such as Hijacking,Spoofing,Poisoning and Snooping</p>
            <UploadImg list1={['Network segmentation',
                'Traffic monitoring and control',
                'Use of firewalls',
                'Use of filtering software']}
                list2={[`Segregating the P2P network from the rest of the organization's network can prevent the spread of P2P traffic.`,
                    'Monitoring network traffic to identify and block P2P traffic can help prevent its spread within the organization.',
                    `Firewalls can be configured to block P2P traffic from entering or leaving the network.`,
                    'Installing software that filters P2P traffic can prevent it from being transmitted or received within the organization.']} />


        </>
    )
}

export default P2P