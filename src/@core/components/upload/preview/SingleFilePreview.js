

export default function SingleFilePreview({ file }) {
  if (!file) {
    return null
  }

  const imgUrl = typeof file === 'string' ? file : file.preview

  return (
    <img
      alt='file preview'
      src={imgUrl}
      style={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)'
      }}
    />
  )
}
