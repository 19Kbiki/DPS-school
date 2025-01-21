import React, {useState} from 'react';
import {Download, RefreshCw} from 'lucide-react';
import './imageDownloadPlaceholder.scss';

const ImageDownloadPlaceholder = ({
                                      paymentSS,
                                      onDownload = () => {
                                      }
                                  }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await onDownload();
            setIsLoading(false);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="image-placeholder">
            {paymentSS
                ? (
                    <img
                        src={paymentSS}
                        alt="Payment"
                        className="participant-table__image"/>) :
                <div
                    className={`image-placeholder__container ${
                        isLoading ? 'image-placeholder__loading' : ''
                    }`}
                    style={{width: '100%', height: '100%'}}
                    onClick={handleDownload}
                >
                    <div className="image-placeholder__icon-wrapper">
                        {isLoading ? (
                            <RefreshCw size={36} strokeWidth={1.5}/>
                        ) : (
                            <Download size={36} strokeWidth={1.5}/>
                        )}
                    </div>
                    <span className="image-placeholder__text">
          {isLoading ? 'Downloading...' : 'Click to download'}
        </span>
                </div>}
        </div>
    );
};

export default ImageDownloadPlaceholder;