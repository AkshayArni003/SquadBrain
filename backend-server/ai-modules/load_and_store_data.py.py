import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

def check_vector_store_exists(persist_directory="./ChromaDB"):
    """
    Check if the vector store exists in the specified directory.

    Args:
        persist_directory (str): The directory to check for the vector store.
    Returns:
        boolean: True if the vector store exists, False otherwise.
    """
    return os.path.exists(persist_directory) and os.listdir(persist_directory)


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
            vector_store = Chroma(persist_directory="./ChromaDB", embedding_function=OllamaEmbeddings(model="gemma:2b"))
            vector_store.add_documents(embedded_documents)
        else:
            print("Creating new vector store...")
            vector_store = Chroma.from_documents(embedded_documents, persist_directory="./ChromaDB", embedding=OllamaEmbeddings(model="gemma:2b"))
        vector_store.persist()
        return True
    except Exception as e:
        print(f"Error storing vector embeddings: {e}")
        return False

def embed_documents(documents):
    """
    Embed documents using OllamaEmbeddings.

    Args:
        documents (list): List of documents to be embedded.
    Returns:
        list: List of embedded documents.
    """
    try:
        embedding_model = OllamaEmbeddings(model="gemma:2b")
        embedded_docs = [embedding_model.embed_documents(document.page_content) for document in documents]
        return embedded_docs
    except Exception as e:
        print(f"Error embedding documents: {e}")
        return []

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


def load_pdf_documents(file_path):
    """
    Load PDF documents from the specified file path using PyPDFLoader.

    Args:
        file_path (str): The path to the PDF file.
    Returns:
        boolean: True if documents are loaded successfully, False otherwise.
    """
    try:
        print("Loading PDF documents...", file_path)
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        documents_split = split_loaded_documents(documents)
        # embedded_documents = embed_documents(documents_split)
        vectore_store = store_vector_embeddings(documents_split)
        print(f"Loaded {vectore_store} documents from {file_path}")
        return True
    except Exception as e:
        print(f"Error loading PDF documents: {e}")
        return False


# load_pdf_documents("C:/Users/Akshay R K/Downloads/STS__Tax Proof User Manual.pdf")

embeddings = OllamaEmbeddings(model="gemma:2b")
vector_store = Chroma(persist_directory="./ChromaDB", embedding_function=embeddings)
query = "Total years of experience of the candidate?"
answer = vector_store.similarity_search(query)
print(answer[0].page_content)