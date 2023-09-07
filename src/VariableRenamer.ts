export default class VariableRenamer {
    public rename(node: any): void {
        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(declaration => {
                if (declaration.id && declaration.id.name) {
                    declaration.id.name = declaration.id.name.replace('entity', 'premenovane');
                    declaration.id.name = declaration.id.name.replace('Entity', 'Premenovane');
                }
            });
        }

        if (node.type === 'JSXElement') {
            node.openingElement.name.name = node.openingElement.name.name.replace('entity', 'premenovane');
            node.openingElement.name.name = node.openingElement.name.name.replace('Entity', 'Premenovane');
        }

        if (node.type === 'CallExpression') {
            if (node.callee && node.callee.name) {
                node.callee.name = node.callee.name.replace('entity', 'premenovane');
                node.callee.name = node.callee.name.replace('Entity', 'Premenovane');
            }
        }

        if (node.type === 'Literal' && typeof node.value === 'string') {
            node.value = node.value.replace('entity', 'premenovane');
            node.value = node.value.replace('Entity', 'Premenovane');
        }

        for (const key in node) {
            if (node[key] && typeof node[key] === 'object') {
                this.rename(node[key]);
            }
        }
    }
}