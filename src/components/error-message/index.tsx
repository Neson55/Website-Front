import React from 'react'

export const ErorMessage = ({
    error = ''
}: {
    error: string;
}) => {
    return error && (
        <p className="text-red-500 mt-2 mb-5 text-small">{error}</p>
    )
}
