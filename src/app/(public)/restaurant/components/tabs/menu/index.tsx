'use client';
import { Branch, Category, Participant, Product } from '@/lib/types';
import { useMemo, useState } from 'react';
import { ProductDetail } from './ProductDetail';
import { CardList } from './CardList';
import { List } from './List';
import { useMediaQuery } from '@/lib/hooks';

interface Props {
  participant?: Participant;
}

export interface ChildProps {
  menuCategories: Category[];
  hideImage?: boolean;
  isList: boolean;
  setCategoryId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSubCategoryId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setVisibleDetail: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId?: string;
  subCategoryId?: string;
  participant?: Branch;
}

const MenuTab: React.FC<Props> = ({ participant }) => {
  const [product, setProduct] = useState<Product>();
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
  const { width } = useMediaQuery();

  const [categoryId, setCategoryId] = useState(participant?.menu?.categories[0].id);
  const [subCategoryId, setSubCategoryId] = useState<string>();

  const { isList, hideImage } = useMemo(() => {
    let isList = false;
    let hideImage = false;
    const configTheme = participant?.configs?.find((e) => e.name === 'MENU_THEME');

    if (configTheme) {
      isList = JSON.parse(configTheme.value ?? '{}')?.menuTheme === 'list';
    } else {
      isList = (width ?? window.innerWidth) > 1280;
    }

    const configImage = participant?.configs?.find((e) => e.name === 'HIDE_IMAGE');

    if (configImage) {
      hideImage = JSON.parse(configImage.value ?? '{}')?.hideImage;
    }

    return { isList, hideImage };
  }, [width]);

  const menuCategories = useMemo(() => {
    const categories = (participant?.menu?.categories?.slice() ?? [])
      .sort((a, b) => a.sort - b.sort)
      .reduce((res: Category[], curr) => {
        if (curr.products && curr.products.length > 0) {
          res.push({ ...curr, children: [] });
        } else if (curr.children && curr.children.length > 0) {
          if (curr.children.find((e) => e.products && e.products.length > 0)) {
            res.push({
              ...curr,
              children: curr.children.filter((e) => (e.products ?? []).length > 0),
            });
          }
        }
        return res;
      }, []);

    setCategoryId(categories[0]?.id);
    return categories;
  }, [participant]);

  return (
    <div className="h-full">
      {isList ? (
        <List
          hideImage={hideImage}
          isList={isList}
          setCategoryId={setCategoryId}
          setSubCategoryId={setSubCategoryId}
          setProduct={setProduct}
          setVisibleDetail={setVisibleDetail}
          menuCategories={menuCategories}
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          participant={participant?.branch}
        />
      ) : (
        <CardList
          participant={participant?.branch}
          isList={isList}
          setCategoryId={setCategoryId}
          setSubCategoryId={setSubCategoryId}
          setProduct={setProduct}
          setVisibleDetail={setVisibleDetail}
          menuCategories={menuCategories}
          categoryId={categoryId}
          subCategoryId={subCategoryId}
        />
      )}
      <ProductDetail
        product={product}
        visible={visibleDetail}
        onClose={() => {
          setVisibleDetail(false);
          setProduct(undefined);
        }}
      />
    </div>
  );
};

export default MenuTab;
