export default class Scene {
  constructor(pointerLock, mouse1, keys1) {
    var camera, scene, renderer;
    var geometry, material, mesh;
    var controls;

    var objects = [];

    var raycaster;

    var mouse = mouse1;
    var keys = keys1;


    init();
    animate();

    var prevTime = performance.now();

    function init() {

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

      var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
      light.position.set( 0.5, 1, 0.75 );
      scene.add( light );

      controls = pointerLock(camera);
      controls.setMouseMove(mouse
        .onMouseMove(controls.getPitch, controls.getObject));

      scene.add( controls.getObject );

      raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

      // floor

      geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
      geometry.rotateX( - Math.PI / 2 );

      for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

        var vertex = geometry.vertices[ i ];
        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

      }

      for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

        var face = geometry.faces[ i ];
        face.vertexColors[ 0 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5 );
        face.vertexColors[ 1 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5 );
        face.vertexColors[ 2 ] = new THREE.Color().setHSL( 0.4, 0.75, 0.5);

      }

      material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      // objects

      geometry = new THREE.BoxGeometry( 20, 20, 20 );

      for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

        var face = geometry.faces[ i ];
        face.vertexColors[ 0 ] = new THREE.Color(0xC1876B);
        face.vertexColors[ 1 ] = new THREE.Color(0xC1876B);
        face.vertexColors[ 2 ] = new THREE.Color(0xC1876B);

      }

      for ( var i = 0; i < 20; i ++ ) {

        material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 2;
        mesh.position.y = Math.floor( Math.random() * 20 ) * 2 + 10;
        mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 2;
        scene.add( mesh );

        material.color.setHex(0xC1876B);

        objects.push( mesh );

      }

      //

      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor( 0xffffff );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      //

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function animate() {

      requestAnimationFrame( animate );


      if ( keys.getEnabled ) {
        raycaster.ray.origin.copy( controls.getObject.position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );

        var isOnObject = intersections.length > 0;

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        keys._velocity.x -= keys._velocity.x * 10.0 * delta;
        keys._velocity.z -= keys._velocity.z * 10.0 * delta;


        keys._velocity.y -= 9.8 * 100.0 * delta;

        if ( keys._forward ) {
          keys._velocity.z -= 400.0 * delta;
        }
        if ( keys._backward ) {
          keys._velocity.z += 400.0 * delta;
        }

        if ( keys._left ) {
          keys._velocity.x -= 400.0 * delta;
        }
        if ( keys._right ) {
          keys._velocity.x += 400.0 * delta;
        }

        if ( isOnObject === true ) {
          keys._velocity.y = Math.max( 0, keys._velocity.y );

          keys._jump = true;
        }

        controls.getObject.translateX( keys._velocity.x * delta );
        controls.getObject.translateY( keys._velocity.y * delta );
        controls.getObject.translateZ( keys._velocity.z * delta );

        if ( controls.getObject.position.y < 10 ) {

          keys._velocity.y = 0;
          controls.getObject.position.y = 10;

          keys._jump = true;

        }

        prevTime = time;

      }

      renderer.render( scene, camera );

    }
  }
}