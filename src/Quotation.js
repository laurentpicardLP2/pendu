import React from 'react';
import './Quotation.css';

const Quotation = ({visuPhrase}) => <div className="Format">{visuPhrase.charAt(0).toUpperCase() + visuPhrase.substring(1)}.</div>
export default Quotation
