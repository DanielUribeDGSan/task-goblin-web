const key = process.env.LEMON_SQUEEZY_API_KEY;

async function getInfo() {
  const storeRes = await fetch('https://api.lemonsqueezy.com/v1/stores', {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${key}`
    }
  });
  const stores = await storeRes.json();
  const storeId = stores.data[0]?.id;
  console.log("Store ID:", storeId);

  const variantRes = await fetch('https://api.lemonsqueezy.com/v1/variants', {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${key}`
    }
  });
  const variants = await variantRes.json();
  const variant = variants.data.find(v => v.attributes.name.includes("License") || true); // just get the first one if we can't find explicitly
  console.log(variants.data.map(v => ({ id: v.id, name: v.attributes?.name })));
}

getInfo().catch(console.error);
