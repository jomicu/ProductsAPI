from os import environ
from logging import INFO, getLogger
from dataclasses import asdict

from lib.models import Product

logger = getLogger()
logger.setLevel(INFO)

class ProductsTable(object):

    def save(self, products: list[Product]) -> None:
        pass

    def get(self) -> list[Product]:
        pass

    def update(self):
        pass

    def delete(self):
        pass