import React from 'react'
import UploadImg from '../../sections/@dashboard/barcode/UploadImg'

function LateralBrute() {
    return (
        <>
            <h3>Lateral Brute</h3>
            <p style={{ fontSize: '12px' }}>Lateral brute force attacks refer to an attempt by an attacker to gain unauthorized access to a network or system by repeatedly trying different combinations of usernames and passwords until the correct one is found</p>
            <UploadImg list1={['Strong passwords',
                'Limit login attempts',
                'Use password management tools',
                'Monitor logs']}
                list2={['Use strong passwords that are difficult to guess and contain a mix of letters, numbers, and symbols.',
                    'Limit the number of login attempts a user can make, so that brute force attacks become impractical.',
                    `Use password management tools that can generate strong passwords and store them securely.`,
                    'Regularly monitor logs to detect and respond to any unusual or suspicious activity.']} />


        </>
    )
}

export default LateralBrute