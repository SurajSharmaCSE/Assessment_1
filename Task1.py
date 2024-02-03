# Function to calculate the discount based on rules
def calculate_discount(cart_total, product_quantities):
    discount_rules = {
        "flat_10_discount": (cart_total > 200, 10),
        "bulk_5_discount": any(qty > 10 for qty in product_quantities),
        "bulk_10_discount": sum(product_quantities) > 20,
        "tiered_50_discount": sum(product_quantities) > 30 and any(qty > 15 for qty in product_quantities)
    }

    applicable_discounts = {rule: discount for rule, (condition, discount) in discount_rules.items() if condition}
    if applicable_discounts:
        max_discount_rule = max(applicable_discounts, key=applicable_discounts.get)
        return max_discount_rule, applicable_discounts[max_discount_rule]
    else:
        return None, 0

# Function to calculate shipping fee
def calculate_shipping_fee(total_units):
    return (total_units // 10) * 5

# Function to calculate gift wrap fee
def calculate_gift_wrap_fee(product_quantities):
    return sum(product_quantities)

# Function to calculate the total cost
def calculate_total_cost(product_quantities, product_prices):
    cart_total = sum(qty * price for qty, price in zip(product_quantities, product_prices))
    discount_rule, discount_amount = calculate_discount(cart_total, product_quantities)
    shipping_fee = calculate_shipping_fee(sum(product_quantities))
    gift_wrap_fee = calculate_gift_wrap_fee(product_quantities)

    discounted_total = cart_total - discount_amount
    total_cost = discounted_total + shipping_fee + gift_wrap_fee

    return cart_total, discount_rule, discount_amount, shipping_fee, gift_wrap_fee, total_cost

# Input product quantities and gift wrap information
product_quantities = []
product_prices = [20, 40, 50]  # Prices for Product A, B, C

for product in ["A", "B", "C"]:
    quantity = int(input(f"Enter the quantity of Product {product}: "))
    product_quantities.append(quantity)

    gift_wrap = input(f"Is Product {product} wrapped as a gift? (yes/no): ").lower()
    if gift_wrap == "yes":
        product_quantities[-1] += 1  # Increment quantity for gift wrap

# Calculate and display the details
subtotal, discount_rule, discount_amount, shipping_fee, gift_wrap_fee, total = calculate_total_cost(product_quantities, product_prices)

print("\nInvoice Details:")
for i, product in enumerate(["A", "B", "C"]):
    print(f"Product {product}: Quantity - {product_quantities[i]}, Total Amount - ${product_quantities[i] * product_prices[i]}")

print(f"\nSubtotal: ${subtotal}")
print(f"Discount Applied ({discount_rule}): -${discount_amount}")
print(f"Shipping Fee: ${shipping_fee}")
print(f"Gift Wrap Fee: ${gift_wrap_fee}")
print(f"Total: ${total}")
