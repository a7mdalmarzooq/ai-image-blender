// DOM Elements
const blendForm = document.getElementById('blendForm');
const productInput = document.getElementById('productInput');
const shopInput = document.getElementById('shopInput');
const productUploadArea = document.getElementById('productUploadArea');
const shopUploadArea = document.getElementById('shopUploadArea');
const productPlaceholder = document.getElementById('productPlaceholder');
const shopPlaceholder = document.getElementById('shopPlaceholder');
const productPreview = document.getElementById('productPreview');
const shopPreview = document.getElementById('shopPreview');
const productPreviewImg = document.getElementById('productPreviewImg');
const shopPreviewImg = document.getElementById('shopPreviewImg');
const removeProductBtn = document.getElementById('removeProductBtn');
const removeShopBtn = document.getElementById('removeShopBtn');
const promptInput = document.getElementById('promptInput');
const mergeStrength = document.getElementById('mergeStrength');
const mergeStrengthValue = document.getElementById('mergeStrengthValue');
const noiseLevel = document.getElementById('noiseLevel');
const noiseLevelValue = document.getElementById('noiseLevelValue');
const generateBtn = document.getElementById('generateBtn');
const resultSection = document.getElementById('resultSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultImageContainer = document.getElementById('resultImageContainer');
const resultImage = document.getElementById('resultImage');
const downloadBtn = document.getElementById('downloadBtn');

// State variables
let productFile = null;
let shopFile = null;

// Initialize the application
function init() {
    setupEventListeners();
    updateGenerateButtonState();
}

// Set up all event listeners
function setupEventListeners() {
    // File input click events
    productUploadArea.addEventListener('click', () => productInput.click());
    shopUploadArea.addEventListener('click', () => shopInput.click());
    
    // File input change events
    productInput.addEventListener('change', (e) => handleFileSelect(e, 'product'));
    shopInput.addEventListener('change', (e) => handleFileSelect(e, 'shop'));
    
    // Drag and drop events for product image
    setupDragAndDrop(productUploadArea, 'product');
    
    // Drag and drop events for shop image
    setupDragAndDrop(shopUploadArea, 'shop');
    
    // Remove button events
    removeProductBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage('product');
    });
    
    removeShopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeImage('shop');
    });
    
    // Range input events
    mergeStrength.addEventListener('input', () => {
        mergeStrengthValue.textContent = mergeStrength.value;
    });
    
    noiseLevel.addEventListener('input', () => {
        noiseLevelValue.textContent = noiseLevel.value;
    });
    
    // Form submission
    blendForm.addEventListener('submit', handleFormSubmit);
}

// Set up drag and drop for an element
function setupDragAndDrop(element, type) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.add('drag-over');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        element.addEventListener(eventName, () => {
            element.classList.remove('drag-over');
        }, false);
    });
    
    element.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFile(file, type);
    }, false);
}

// Prevent default behavior for drag and drop events
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Handle file selection from input
function handleFileSelect(e, type) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file, type);
    }
}

// Process the selected file
function handleFile(file, type) {
    if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        if (type === 'product') {
            productFile = file;
            productPreviewImg.src = e.target.result;
            productPlaceholder.style.display = 'none';
            productPreview.style.display = 'block';
        } else {
            shopFile = file;
            shopPreviewImg.src = e.target.result;
            shopPlaceholder.style.display = 'none';
            shopPreview.style.display = 'block';
        }
        
        updateGenerateButtonState();
    };
    
    reader.readAsDataURL(file);
}

// Remove an uploaded image
function removeImage(type) {
    if (type === 'product') {
        productFile = null;
        productPreviewImg.src = '';
        productPlaceholder.style.display = 'flex';
        productPreview.style.display = 'none';
        productInput.value = '';
    } else {
        shopFile = null;
        shopPreviewImg.src = '';
        shopPlaceholder.style.display = 'flex';
        shopPreview.style.display = 'none';
        shopInput.value = '';
    }
    
    updateGenerateButtonState();
}

// Update the state of the generate button
function updateGenerateButtonState() {
    generateBtn.disabled = !(productFile && shopFile && promptInput.value.trim());
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!productFile || !shopFile || !promptInput.value.trim()) {
        alert('Please upload both images and enter a text prompt.');
        return;
    }
    
    // Show loading state
    resultSection.style.display = 'block';
    loadingIndicator.style.display = 'flex';
    resultImageContainer.style.display = 'none';
    generateBtn.disabled = true;
    
    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('productImage', productFile);
        formData.append('shopImage', shopFile);
        formData.append('prompt', promptInput.value.trim());
        formData.append('mergeStrength', mergeStrength.value);
        formData.append('noiseLevel', noiseLevel.value);
        
        // Send request to backend
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        
        const data = await response.json();
        
        // Display the result
        resultImage.src = data.imageUrl;
        downloadBtn.href = data.imageUrl;
        
        // Hide loading, show result
        loadingIndicator.style.display = 'none';
        resultImageContainer.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image. Please try again.');
        loadingIndicator.style.display = 'none';
    } finally {
        generateBtn.disabled = false;
    }
}

// Add input event listener for prompt field
promptInput.addEventListener('input', updateGenerateButtonState);

// Initialize the application
init();
