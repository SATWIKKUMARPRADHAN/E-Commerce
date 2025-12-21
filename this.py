import random

def generate_dummy_awb(prefix="999"):
    """
    Generate a dummy AWB number.
    :param prefix: 3-digit airline prefix (default '999' for dummy use)
    :return: 11-digit AWB number as a string
    """
    # Validate prefix
    if not (prefix.isdigit() and len(prefix) == 3):
        raise ValueError("Prefix must be a 3-digit number string.")

    # Generate 8-digit serial number
    serial_number = f"{random.randint(0, 99999999):08d}"

    # Combine prefix and serial
    awb_number = prefix + serial_number
    return awb_number

# Example usage
if __name__ == "__main__":
    for _ in range(5):
        print(generate_dummy_awb())  # e.g., 99912345678
