module.exports = (template, item) => {
	let replacement = template.replace(/{%ITEM_NAME%}/g, item.itemName);
	replacement = replacement.replace(/{%IMAGE%}/g, item.image);
	replacement = replacement.replace(/{%FROM%}/g, item.from);
	replacement = replacement.replace(/{%NUTRIENTS%}/g, item.nutrients);
	replacement = replacement.replace(/{%QUANTITY%}/g, item.quantity);
	replacement = replacement.replace(/{%PRICE%}/g, item.price);
	replacement = replacement.replace(/{%DESCRIPTION%}/g, item.description);
	replacement = replacement.replace(/{%ID%}/g, item.id);

	if (!item.organic) replacement = replacement.replace(/{%ID%}/g, 'not-organic');

	return replacement;
}