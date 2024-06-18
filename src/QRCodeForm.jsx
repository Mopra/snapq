//QRCodeForm.jsx^
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import qLogo from './assets/q-logo.png';
import { sanitizeInput } from './utils/sanitizeInput';

const QRCodeForm = ({ handleSubmit, showGenerateButton, isLoggedIn }) => {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const sanitizedUrl = sanitizeInput(url);
    setSubmittedUrl(sanitizedUrl); // Store the sanitized URL to display the QR code
    handleSubmit(sanitizedUrl);
    setUrl('');
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter URL or text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {showGenerateButton && <button type="submit">Generate QR Code</button>}
      </form>
      {!isLoggedIn && submittedUrl && (
        <div className="qr-code-notloggedin">
          <QRCode
            value={submittedUrl}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            qrStyle="dots"
            eyeRadius={[
              { outer: 10, inner: 0 },
              { outer: 10, inner: 0 },
              { outer: 10, inner: 0 }
            ]}
            logoImage={qLogo}
            logoWidth={50}
          />
          <a href={submittedUrl} target="_blank">{submittedUrl}</a>
        </div>
      )}
    </>
  );
};

export default QRCodeForm;