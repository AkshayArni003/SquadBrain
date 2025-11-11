from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import WebBaseLoader
from .load_and_store_utils import split_loaded_documents, store_vector_embeddings


def load_and_store_data(file_path, file_type):
    """
    Load and store data based on the file type.

    Args:
        file_path (str): The path to the file.
        file_type (str): The type of the file ('pdf' or 'text').
    Returns:
        boolean: True if data is loaded and stored successfully, False otherwise.
    """
    print(f"Loading and storing data from {file_path} of type {file_type}...")
    if file_type.lower() == "pdf":
        print("Loading PDF documents...", file_path)
        loader = PyPDFLoader(file_path)
    elif file_type.lower() == "txt":
        print("Loading text documents...", file_path)
        loader = TextLoader(file_path)
    elif file_type.lower() == "url":
        print("Loading URL Content...", file_path)
        loader = WebBaseLoader(file_path)
    else:
        print(f"Unsupported file type: {file_type}")
        return False
    documents = loader.load()
    documents_split = split_loaded_documents(documents)
    vector_store = store_vector_embeddings(documents_split)
    if vector_store:
        print(f"Loaded and stored documents from {file_path} successfully.")
        return True
    else:
        print(f"Failed to load and store documents from {file_path}.")
        return False


# load_and_store_data("https://docs.langchain.com/oss/python/langchain/agents", "url")

# embeddings = OllamaEmbeddings(model="gemma:2b")
# vector_store = Chroma(persist_directory="./ChromaDB", embedding_function=embeddings)
# query = "Total years of experience of the candidate?"
# answer = vector_store.similarity_search(query)
# print(answer[0].page_content)