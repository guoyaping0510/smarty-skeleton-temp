import generateSkeleton from "./generate";
export default function smartySkeleton(root, config) {
  const instance = new generateSkeleton({root});
  instance.performWorkUnit();
}
