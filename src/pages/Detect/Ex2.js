import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function Ex2() {
    return (
        <>
            <h3>Discover Data Exfiltration 2</h3>
            <p style={{ fontSize: '12px' }}>Discover Data Exfiltration 2 refers to a type of security event or incident where sensitive or confidential data is illegally transferred from a computer network to an unauthorized external source. It typically occurs through various methods such as email, instant messaging, cloud storage, or by exploiting vulnerabilities in the network.</p>
            <UploadImg list1={[
                                    'Remediate the breach',
                                    'Review and improve security measures',
                                    'Implement stronger security controls',
                                    'Regularly backup data'
                                ]} list2={['Implement fixes and patches to close the security vulnerability that was exploited by the attacker.',
                                    `Review your organization's security measures and make improvements where necessary to prevent future breaches.`,
                                    'Consider implementing stronger security controls such as multi-factor authentication, encryption, and access controls to enhance the security of your systems and data.',
                                    'Ensure that critical data is regularly backed up to a secure location, so that it can be restored in case of a breach or data loss.'
                                ]} />


        </>
    )
}

export default Ex2