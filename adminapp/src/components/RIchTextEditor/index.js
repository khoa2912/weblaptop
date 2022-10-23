const CustomContentStateConverter = (contentState) => {
  // changes block type of images to 'atomic'
  const newBlockMap = contentState.getBlockMap().map((block) => {
    const entityKey = block.getEntityAt(0);
    if (entityKey !== null) {
      const entityBlock = contentState.getEntity(entityKey);
      const entityType = entityBlock.getType();
      switch (entityType) {
        case 'IMAGE': {
          const newBlock = block.merge({
            type: 'atomic',
            text: 'img',
          });
          return newBlock;
        }
        default:
          return block;
      }
    }
    return block;
  });
  const newContentState = contentState.set('blockMap', newBlockMap);
  return newContentState;
};
export default CustomContentStateConverter