// QR Code Generator for Tiveau landing page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Generate QR codes
    generateQRCodes();
});

// Generate QR codes for WhatsApp and Email
function generateQRCodes() {
    // WhatsApp QR Code
    const whatsappNumber = '+31619045546';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;
    generateQR('whatsapp-qr', whatsappUrl);
    
    // Email QR Code
    const emailAddress = 'info@tiveau.nl';
    const emailUrl = `mailto:${emailAddress}`;
    generateQR('email-qr', emailUrl);
}

// Generate QR code in specified element
function generateQR(elementId, data) {
    const element = document.getElementById(elementId);
    
    if (!element) return;
    
    // Options for QR code
    const options = {
        width: element.clientWidth,
        height: element.clientHeight,
        margin: 1,
        color: {
            dark: '#0e0e0e', // Matte black
            light: '#ffffff' // White
        }
    };
    
    // Generate QR code
    QRCode.toCanvas(element, data, options, (error) => {
        if (error) console.error('Error generating QR code:', error);
    });
}
