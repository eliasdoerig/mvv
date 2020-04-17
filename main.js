(function(document){
    const sortable = new Sortable.default(document.getElementById('elements_container'), {
        draggable: '.isDraggable',
    });

}(document));

