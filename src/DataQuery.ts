import { Collection } from "./Type";

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
  handleSetItems: (items: unknown[]) => void;
}

export const GetGlasses = async ({
  page,
  gender,
  limit,
  lensTypes,
  frameTypes,
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
      `http://api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-${gender}/glasses?sort[type]=collection_relations_position&sort[order]=asc&filters[lens_variant_prescriptions][]=fashion&filters[lens_variant_types][]=classic&page[limit]=${limit}&page[number]=${page}${totalFilter}`
    );
    const res = await data.json();
    console.log(res, "resssss");
    await handleSetItems(res.glasses);
    return console.log(res.glasses);
  } catch (error) {
    console.log(error);
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
      "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections"
    );
    const res = await data.json();
    await handleSetCollections(res.collections);
  } catch (error) {
    console.log(error);
    return alert("Something went wrong, please refresh the page");
  }
};
