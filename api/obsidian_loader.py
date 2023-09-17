from langchain.document_loaders import ObsidianLoader


def get_all_notes():
  # same path as this file
  loader = ObsidianLoader('api/docs')

  docs = loader.load()
  
  return docs