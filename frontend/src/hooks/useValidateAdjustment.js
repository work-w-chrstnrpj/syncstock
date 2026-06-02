import { useState, useEffect } from 'react';
import useAuthAxios from './useAuthAxios';

const useValidateAdjustment = (itemName, location, sku, productCode, quantity) => {
    // Validation is now handled server-side during the API request
    return { isValid: true, loading: false, error: null };
};

export default useValidateAdjustment;
