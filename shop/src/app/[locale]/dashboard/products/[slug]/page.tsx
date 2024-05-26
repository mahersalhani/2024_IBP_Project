import { notFound } from 'next/navigation';

import { Shop } from '@/utils';
import EditProduct from '../_components/edit-product';

interface EditProductPageProps {
  params: {
    slug: string;
  };
}

const EditProductPage = async (props: EditProductPageProps) => {
  const { slug } = props.params;
  const res = await Shop.getProduct(slug);
  const product = res.data;

  if (!product.id) return notFound();

  return <EditProduct data={product} />;
};

export default EditProductPage;
