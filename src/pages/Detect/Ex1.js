import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function Ex1() {
    return (
        <>
            <h3>Discover Data Exfiltration 1</h3>
            <p style={{ fontSize: '12px' }}>Discover Data Exfiltration 1 refers to a type of security incident where sensitive data is deliberately removed from an organization's network. This can be done by an insider, such as an employee or contractor, or by an external attacker who has gained unauthorized access to the network. The purpose of data exfiltration is typically to steal sensitive information or to compromise the security of the target organization.</p>
            <UploadImg list1={[
                'Network monitoring and traffic analysis',
                'Data leak prevention (DLP) software',
                'Endpoint security',
                'Firewall rules and restrictions'
            ]} list2={['Use network monitoring and traffic analysis tools to identify and track excessive data transfer from a single host, and investigate any suspicious activity.',
                'Implement DLP software to monitor and block sensitive data from being transmitted outside the enterprise.',
                'Ensure that endpoint security measures, such as anti-virus software, are in place and up-to-date on all hosts to prevent malicious data exfiltration.',
                'Configure firewall rules and restrictions to limit or block excessive data transfer from a single host.'
            ]} />


        </>
    )
}

export default Ex1