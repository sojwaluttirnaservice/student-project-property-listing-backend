import toast from "../toast-alerts-handler.js"

$(() => {

    function resetForm() {
        // Reset form
        $('#propertyForm')[0].reset();

        // Reset file inputs
        $('#thumbnail_image').val('');
        $('#gallery_images').val('');

        // Reset any preview images
        $('.preview-image').attr('src', '');

        // Uncheck all checkboxes
        $('input[type="checkbox"]').prop('checked', false);

        // Reset any custom select elements if you have them
        $('select').prop('selectedIndex', 0);

        // Remove any error classes
        $('.error').removeClass('error');

        // Optionally scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    const handleAddProperty = async (propertyData) => {
        try {
            // Disable submit button and show loading state
            const submitBtn = $('#submit-btn');
            const originalText = submitBtn.text();
            submitBtn.prop('disabled', true).text('Saving...');

            const url = '/api/v1/property';

            const response = await fetch(url, {
                method: 'POST',
                body: propertyData
            });

            const { success, message } = await response.json();

            if (success) {
                toast.success(message)
                resetForm()
                // Redirect to properties list page after successful addition
                window.location.href = '/property';
            } else {
                toast.warning(message);
                // Re-enable button and restore original text if there's an error
                submitBtn.prop('disabled', false).text(originalText);
            }
        } catch (error) {
            console.error('Error adding property:', error);
            toast.error('Failed to add property. Please try again.');
            // Re-enable button and restore original text on error
            $('#submit-btn').prop('disabled', false).text('Add Property');
        }
    };

    /*
    function setDummyValues() {

        // Basic Information
        $('#title').val('3 BHK Luxury Apartment in Bandra');
        $('#type').val('Apartment');
        $('#status').val('For Sale');

        // Location Details
        $('#address').val('123, Sea View Apartments, Carter Road');
        $('#city').val('Mumbai');
        $('#state').val('Maharashtra');
        $('#zipcode').val('400050');

        // Property Details
        $('#price').val('15000000');
        $('#area_sqft').val('1500');
        $('#bedrooms').val('3');
        $('#bathrooms').val('2');
        $('#parking_spaces').val('2');
        $('#furnishing').val('Semi-Furnished');

        // Owner Information
        $('#owner_name').val('John Doe');
        $('#owner_contact').val('9876543210');
        $('#rera_registered').prop('checked', true);

        // Description
        $('#description').val('Luxurious 3 BHK apartment with sea view. Modern amenities including modular kitchen, air conditioning, and 24x7 security. Close to shopping centers and schools.');

        // Check some amenities
        $('input[name="amenities[]"]').each(function () {
            if (['Lift', 'Security', 'Garden'].includes($(this).val())) {
                $(this).prop('checked', true);
            }
        });

    }

    setDummyValues()
    */
    // Handle form submission
    $(document).on('click', '#submit-btn', function (e) {
        e.preventDefault();


        let form = document.getElementById('propertyForm')
        // Create FormData object from the form
        const propertyData = new FormData(form);

        // Get amenities array and add it to formData
        const amenities = [];
        $('input[name="amenities[]"]:checked').each(function () {
            amenities.push($(this).val());
        });

        // Remove individual amenity checkboxes and add as array
        propertyData.delete('amenities[]');
        propertyData.append('amenities', JSON.stringify(amenities));

        // Handle RERA checkbox
        const reraRegistered = $('#rera_registered').is(':checked');
        propertyData.set('rera_registered', reraRegistered);

        handleAddProperty(propertyData);
    });

    // Optional: Preview images before upload
    function previewImage(input, previewElement) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $(previewElement).attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    // Handle thumbnail image preview
    $('#thumbnail_image').change(function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // You can add an img element in your HTML to show preview
                // $('#thumbnail_preview').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Handle gallery images preview
    $('#gallery_images').change(function () {
        if (this.files) {
            // You can add preview functionality for multiple images here
            Array.from(this.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Add preview images to a container
                    // $('#gallery_preview').append(`<img src="${e.target.result}" />`);
                }
                reader.readAsDataURL(file);
            });
        }
    });

    // Optional: Form validation
    function validateForm() {
        // Add custom validation if needed
        const requiredFields = [
            'title',
            'type',
            'status',
            'address',
            'city',
            'state',
            'zipcode',
            'price',
            'area_sqft',
            'owner_name',
            'owner_contact'
        ];

        let isValid = true;
        requiredFields.forEach(field => {
            const value = $(`#${field}`).val();
            if (!value || value.trim() === '') {
                isValid = false;
                $(`#${field}`).addClass('error');
            } else {
                $(`#${field}`).removeClass('error');
            }
        });

        return isValid;
    }

    // Add error class styling
    const errorStyle = `
        .error {
            border-color: #ef4444 !important;
        }
    `;
    $('<style>').text(errorStyle).appendTo('head');
});