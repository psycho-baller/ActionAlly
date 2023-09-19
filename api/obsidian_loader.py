from langchain.document_loaders import ObsidianLoader


def get_all_notes():
  loader = ObsidianLoader('api/daily')

  docs = loader.load()
  
  return docs