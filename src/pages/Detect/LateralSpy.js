import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function LateralSpy() {
    return (
        <>
            <h3>Lateral Spy</h3>
            <p style={{ fontSize: '12px' }}>Lateral spying refers to the unauthorized access or theft of confidential or sensitive information within an organization by an insider, such as an employee, contractor, or partner. This type of espionage is often more damaging than attacks from external sources because insiders have legitimate access to the organization's networks and systems, making it easier for them to steal or compromise sensitive information.</p>
            <UploadImg list1={['Access control',
                'Data encryption',
                'Background checks',
                'Regular security audits']}
                list2={['Implement strict access controls to sensitive information based on the principle of least privilege, meaning that employees should only have access to the information necessary for their job.',
                    'Encrypt sensitive data both in transit and at rest to protect it from unauthorized access.',
                    `Conduct thorough background checks on employees, especially those with access to sensitive information, to prevent any potential security threats.`,
                    'Regularly assess the security posture of the organization to identify and remediate potential vulnerabilities.']} />


        </>
    )
}

export default LateralSpy