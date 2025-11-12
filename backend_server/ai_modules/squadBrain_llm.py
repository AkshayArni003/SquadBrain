import os

from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama
# from langchain_core.prompts import PromptTemplate
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.
# from langchain.chat_models import ChatOpenAI


VECTOR_STORE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ChromaDB")
embeddings = OllamaEmbeddings(model="gemma:2b")
vector_store = Chroma(persist_directory=VECTOR_STORE_PATH, embedding_function=embeddings)
# retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 4})

# SYSTEM_PROMPT = """ Answer questions based on the provided context and knowledge base."""

# prompt = PromptTemplate(
#     input_variables=[SYSTEM_PROMPT, "question", "documents"],
#     template="""
#     {SYSTEM_PROMPT}
#     Question: {question}
#     Documents: {documents}
#     Answer:
#     """.strip(),
# )

# # llm = ChatOllama(model="gemma:2b", temperature=0)
# # rag_chain = prompt | llm | StrOutputParser()

# # def get_answer(question: str) -> str:
# #     """
# #     Get an answer to the question using the RAG chain.

# #     Args:
# #         question (str): The question to answer.
# #     Returns:
# #         str: The answer to the question.
# #     """
# #     relevant_docs = vector_store.max_marginal_relevance_search(question)
# #     print(relevant_docs)
# #     docs_content = "\n".join([doc.page_content for doc in relevant_docs])
# #     # print(docs_content)
# #     answer = rag_chain.invoke({"question": question, "documents": docs_content, "SYSTEM_PROMPT": SYSTEM_PROMPT})
# #     return answer
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# chat_model = ChatOpenAI(temperature=0, openai_api_key=OPENAI_API_KEY, model_name="gpt-4o-mini")  # adjust model
# qa = RetrievalQA.from_chain_type(llm=chat_model, chain_type="stuff", retriever=retriever, return_source_documents=True)
# result = qa.run("What are agents in langchain?")
# print(result)

# # print(get_answer("What are agents in langchain?"))


from langchain.agents.middleware import dynamic_prompt, ModelRequest
from langchain_openai import ChatOpenAI
import dotenv
dotenv.load_dotenv()

from langchain.agents import create_agent
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
model = ChatOpenAI(model="gpt-4o")
@dynamic_prompt
def prompt_with_context(request: ModelRequest) -> str:
    """Inject context into state messages."""
    last_query = request.state["messages"][-1].text
    retrieved_docs = vector_store.max_marginal_relevance_search(last_query)
    docs_content = "\n\n".join(doc.page_content for doc in retrieved_docs)
    print("Retrieved Docs Content:", docs_content)
    system_message = (
        "You are a helpful assistant. Use the following context in your response:"
        f"\n\n{docs_content}"
    )

    return system_message
agent = create_agent(model, tools=[], middleware=[prompt_with_context])

while True:
    query = input("Enter your query (or 'exit' to quit): ")
    if query.lower() == 'exit':
        break
    for step in agent.stream(
        {"messages": [{"role": "user", "content": query}]},
        stream_mode="values",
    ):
        step["messages"][-1].pretty_print()