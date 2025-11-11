import os

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
ROOT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
VECTOR_DB_ROOT_DIRECTORY = os.path.join(ROOT_DIRECTORY, "ChromaDB")
def check_vector_store_exists():
    """
    Check if the vector store exists in the specified directory.

    Args:
        persist_directory (str): The directory to check for the vector store.
    Returns:
        boolean: True if the vector store exists, False otherwise.
    """
    return os.path.exists(VECTOR_DB_ROOT_DIRECTORY) and os.listdir(VECTOR_DB_ROOT_DIRECTORY)


def store_vector_embeddings(embedded_documents):    
    """
    Store vector embeddings in a vector database.

    Args:
        embedded_documents (list): List of embedded documents.
    Returns:
        boolean: True if storage is successful, False otherwise.
    """
    try:
        if check_vector_store_exists():
            print("Vector store exists. Loading existing store...")
            vector_store = Chroma(persist_directory=VECTOR_DB_ROOT_DIRECTORY, embedding_function=OllamaEmbeddings(model="gemma:2b"))
            vector_store.add_documents(embedded_documents)
        else:
            print("Creating new vector store...")
            vector_store = Chroma.from_documents(embedded_documents, persist_directory=VECTOR_DB_ROOT_DIRECTORY, embedding=OllamaEmbeddings(model="gemma:2b"))
        return True
    except Exception as e:
        print(f"Error storing vector embeddings: {e}")
        return False
    

def split_loaded_documents(documents, chunk_size=1000, chunk_overlap=200):
    """
    Split loaded documents into smaller chunks using RecursiveCharacterTextSplitter.

    Args:
        documents (list): List of loaded documents.
        chunk_size (int): The size of each chunk.
        chunk_overlap (int): The overlap between chunks.
    Returns:
        list: List of split document chunks.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )
    split_docs = text_splitter.split_documents(documents)
    return split_docs