// Function to calculate the discount based on rules
function calculateDiscount(cartTotal, productQuantities) 
{
    const discountRules = 
    {
        flat_10_discount: cartTotal > 200 ? 10 : 0,
        bulk_5_discount: productQuantities.some(qty => qty > 10) ? 5 : 0,
        bulk_10_discount: productQuantities.reduce((sum, qty) => sum + qty, 0) > 20 ? 10 : 0,
        tiered_50_discount: productQuantities.reduce((sum, qty) => sum + qty, 0) > 30 && productQuantities.some(qty => qty > 15) ? 50 : 0
    };

    const applicableDiscounts = Object.entries(discountRules).filter(([rule, discount]) => discount > 0);
    if (applicableDiscounts.length > 0) 
    {
        const [maxDiscountRule, maxDiscount] = applicableDiscounts.reduce((max, curr) => (curr[1] > max[1] ? curr : max));
        return [maxDiscountRule, maxDiscount];
    } 
    else 
    {
        return [null, 0];
    }
}

// Function to calculate shipping fee
function calculateShippingFee(totalUnits) 
{
    return Math.floor(totalUnits / 10) * 5;
}

// Function to calculate gift wrap fee
function calculateGiftWrapFee(productQuantities) 
{
    return productQuantities.reduce((sum, qty) => sum + qty, 0);
}

// Function to calculate the total cost
function calculateTotalCost(productQuantities, productPrices)
 {
    const cartTotal = productQuantities.reduce((sum, qty, index) => sum + qty * productPrices[index], 0);
    const [discountRule, discountAmount] = calculateDiscount(cartTotal, productQuantities);
    const shippingFee = calculateShippingFee(productQuantities.reduce((sum, qty) => sum + qty, 0));
    const giftWrapFee = calculateGiftWrapFee(productQuantities);

    const discountedTotal = cartTotal - discountAmount;
    const totalCost = discountedTotal + shippingFee + giftWrapFee;

    return [cartTotal, discountRule, discountAmount, shippingFee, giftWrapFee, totalCost];
}

// Input product quantities and gift wrap information
const productQuantities = [];
const productPrices = [20, 40, 50]; // Prices for Product A, B, C

for (let i = 0; i < 3; i++) 
{
    const quantity = parseInt(prompt(`Enter the quantity of Product ${String.fromCharCode(65 + i)}: `), 10);
    productQuantities.push(quantity);

    const giftWrap = prompt(`Is Product ${String.fromCharCode(65 + i)} wrapped as a gift? (yes/no): `).toLowerCase();
    if (giftWrap === "yes") {
        productQuantities[i]++;
    }
}

// Calculate and display the details
const [subtotal, discountRule, discountAmount, shippingFee, giftWrapFee, total] = calculateTotalCost(productQuantities, productPrices);

console.log("\nInvoice Details:");
["A", "B", "C"].forEach((product, i) => 
{
    console.log(`Product ${product}: Quantity - ${productQuantities[i]}, Total Amount - $${productQuantities[i] * productPrices[i]}`);
});

console.log(`\nSubtotal: $${subtotal}`);
console.log(`Discount Applied (${discountRule}): -$${discountAmount}`);
console.log(`Shipping Fee: $${shippingFee}`);
console.log(`Gift Wrap Fee: $${giftWrapFee}`);
console.log(`Total: $${total}`);
