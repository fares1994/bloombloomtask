import { Collection, GLassItem } from "./Type";

interface PropsGetGlasses {
  page: number;
  gender: "men" | "women";
  limit: number;
  lensTypes: (
    | "black"
    | "tortoise"
    | "coloured"
    | "crystal"
    | "dark"
    | "bright"
  )[];
  frameTypes: ("square" | "rectangle" | "round" | "cat-eye")[];
  collection: "sunglasses" | "spectacles";
  handleSetItems: (items: GLassItem[]) => void;
}

export const GetGlasses = async ({
  page,
  gender,
  limit,
  lensTypes,
  frameTypes,
  collection,
  handleSetItems,
}: PropsGetGlasses) => {
  const lensTypeFilter = lensTypes.map(
    (lensType) =>
      `&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${lensType}`
  );
  const frameTypeFilter = frameTypes.map(
    (frameType) =>
      `&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${frameType}`
  );
  const totalFilter = [
    ...lensTypeFilter,
    ...frameTypeFilter,
    `&filters[frame_variant_home_trial_available]=false`,
  ].join("");

  try {
    const data = await fetch(
      `https://bloombloomproxy.herokuapp.com/http://api.bloobloom.com/user/v1/sales_channels/website/collections/${collection}-${gender}/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=${limit}&page[number]=${page}${totalFilter}`
    );
    const res = await data.json();
    await handleSetItems(res.glasses);
  } catch (error) {
    return alert("Something went wrong, please refresh the page");
  }
};
interface PropsGetCollections {
  handleSetCollections: (collections: Collection[]) => void;
}
export const GetCollections = async ({
  handleSetCollections,
}: PropsGetCollections) => {
  try {
    const data = await fetch(
      "https://bloombloomproxy.herokuapp.com/https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections",
    );
    const res = await data.json();
    await handleSetCollections(res.collections);
  } catch (error) {
    return alert("Something went wrong, please refresh the page");
  }
};
