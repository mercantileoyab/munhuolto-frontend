export const boxStyleCustom = {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2, // 2 = 16px (default theme spacing unit * 0.5)
    '& .MuiCardContent-root': {
        padding: 2,
    },
    '& .MuiCardActions-root': {
        padding: 1,
    },
    '& .MuiTypography-h6': {
        fontSize: '1.25rem', // 20px
        fontWeight: 'bold',
    },
    '& .MuiTypography-body1': {
        fontSize: '1rem', // 16px
    },
};