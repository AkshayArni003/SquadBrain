import os

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.agents.middleware import dynamic_prompt, ModelRequest
from langchain_openai import ChatOpenAI
import dotenv
dotenv.load_dotenv()

from langchain.agents import create_agent
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
VECTOR_STORE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ChromaDB")
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = Chroma(persist_directory=VECTOR_STORE_PATH, embedding_function=embeddings)

model = ChatOpenAI(model="gpt-4o")
@dynamic_prompt
def prompt_with_context(request: ModelRequest) -> str:
    """Inject context into state messages."""
    last_query = request.state["messages"][-1].text
    retrieved_docs = vector_store.max_marginal_relevance_search(last_query)
    docs_content = "\n\n".join(doc.page_content for doc in retrieved_docs)
    system_message = (
        """
        You are a helpful assistant. Use the following context in your response, 
        Answer the question based on the context provided. Go through the
        content in the documents carefully before answering. 
        Ask any questions only if you are unable to find the answer in the provided context.
        """ 
        f"\n\n{docs_content}"
    )

    return system_message
agent = create_agent(model, tools=[], middleware=[prompt_with_context])

async def get_answer_from_squadbrain(query: str):
    for token, metadata in agent.stream(
        {"messages": [{"role": "user", "content": query}]},
        stream_mode="messages",
    ):
        if token.content_blocks:
            text = token.content_blocks[-1]["text"]
            yield text