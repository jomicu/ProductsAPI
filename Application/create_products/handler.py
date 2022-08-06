from dataclasses import dataclass, asdict
from uuid import uuid4

from lib.models import Product
from lib.products_table import ProductsTable

@dataclass(frozen=True)
class Request(object):

    products: list[dict]

@dataclass(frozen=True)
class Response(object):

    status_code: int
    products: list[Product]    

def handle_event(event, context):
    request = Request(**event)

    products = [Product(id=str(uuid4()), **product) for product in request.products]

    products_table = ProductsTable()
    products_table.save(products)

    return asdict(Response(201, products))