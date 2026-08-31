'use client';import { useState, useRef, useEffect } from "react";

const TEAMS = [{"name":"Maryland","conf":"Big Ten","players":[{"name":"D.J. Wagner","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":7.4,"rpg":1.6,"apg":2.5,"spg":0.9,"bpg":0.3,"fgp":43.1,"tpp":35.3},{"name":"Andre Mills","pos":"G","height":"6-4","year":"R-So.","hasStats":true,"ppg":12.2,"rpg":4.1,"apg":1.6,"spg":0.5,"bpg":0.3,"fgp":40.9,"tpp":34.6},{"name":"Baba Oladotun","pos":"F","height":"6-10","year":"Fr.","hasStats":false},{"name":"Tomislav Buljan","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":13.2,"rpg":10.4,"apg":1.5,"spg":1.1,"bpg":0.5,"fgp":55.0,"tpp":30.4},{"name":"Pharrel Payne","pos":"F","height":"6-9","year":"R-Sr.","hasStats":true,"ppg":17.5,"rpg":7.2,"apg":1.4,"spg":0.4,"bpg":1.1,"fgp":62.4,"tpp":0.0}]},{"name":"Indiana","conf":"Big Ten","players":[{"name":"Markus Burton","pos":"G","height":"6-0","year":"R-Jr.","hasStats":true,"ppg":18.5,"rpg":2.8,"apg":3.7,"spg":1.6,"bpg":0.1,"fgp":48.9,"tpp":30.6},{"name":"Bryce Lindsay","pos":"G","height":"6-3","year":"R-Jr.","hasStats":true,"ppg":12.3,"rpg":2.1,"apg":2.1,"spg":0.7,"bpg":0.0,"fgp":38.3,"tpp":35.6},{"name":"Darren Harris","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":3.5,"rpg":0.9,"apg":0.4,"spg":0.3,"bpg":0.0,"fgp":36.7,"tpp":33.3},{"name":"Aiden Sherrell","pos":"F","height":"6-11","year":"Jr.","hasStats":true,"ppg":11.2,"rpg":6.2,"apg":1.1,"spg":0.5,"bpg":2.3,"fgp":54.8,"tpp":33.3},{"name":"Samet Yigitoglu","pos":"C","height":"7-2","year":"Jr.","hasStats":true,"ppg":10.7,"rpg":7.9,"apg":1.6,"spg":0.5,"bpg":1.3,"fgp":62.8,"tpp":0.0}]},{"name":"Michigan","conf":"Big Ten","players":[{"name":"Elliot Cadeau","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":10.1,"rpg":2.6,"apg":5.7,"spg":0.7,"bpg":0.2,"fgp":41.5,"tpp":37.5},{"name":"Trey McKenney","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":9.5,"rpg":2.7,"apg":0.9,"spg":0.4,"bpg":0.0,"fgp":45.5,"tpp":37.8},{"name":"Brandon McCoy","pos":"G","height":"6-5","year":"Fr.","hasStats":false},{"name":"J.P. Estrella","pos":"F","height":"6-11","year":"R-Jr.","hasStats":true,"ppg":10.2,"rpg":5.4,"apg":0.8,"spg":0.3,"bpg":0.4,"fgp":61.9,"tpp":40.0},{"name":"Moustapha Thiam","pos":"C","height":"7-2","year":"Jr.","hasStats":true,"ppg":12.8,"rpg":7.1,"apg":0.5,"spg":0.8,"bpg":1.6,"fgp":52.5,"tpp":28.8}]},{"name":"Wisconsin","conf":"Big Ten","players":[{"name":"Owen Foxwell","pos":"G","height":"6-2","year":"Sr.","hasStats":false},{"name":"Trey Autry","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":11.0,"rpg":3.5,"apg":1.5,"spg":0.8,"bpg":0.2,"fgp":43.5,"tpp":38.5},{"name":"Eian Elmer","pos":"G","height":"6-6","year":"Sr.","hasStats":true,"ppg":12.7,"rpg":5.9,"apg":1.1,"spg":1.2,"bpg":0.7,"fgp":49.8,"tpp":42.9},{"name":"Austin Rapp","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":9.7,"rpg":4.0,"apg":1.6,"spg":0.5,"bpg":0.5,"fgp":41.9,"tpp":36.3},{"name":"Nolan Winter","pos":"F","height":"7-0","year":"Sr.","hasStats":true,"ppg":13.1,"rpg":8.5,"apg":1.5,"spg":0.5,"bpg":1.2,"fgp":56.9,"tpp":32.6}]},{"name":"Ohio St.","conf":"Big Ten","players":[{"name":"Justin Pippen","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":14.2,"rpg":3.9,"apg":4.6,"spg":1.9,"bpg":0.6,"fgp":37.0,"tpp":32.7},{"name":"John Mobley Jr.","pos":"G","height":"6-2","year":"Jr.","hasStats":true,"ppg":15.7,"rpg":2.4,"apg":2.8,"spg":0.7,"bpg":0.1,"fgp":43.2,"tpp":41.1},{"name":"Anthony Thompson","pos":"F","height":"6-9","year":"Fr.","hasStats":false},{"name":"A'mare Bynum","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":9.7,"rpg":4.9,"apg":1.1,"spg":0.6,"bpg":0.8,"fgp":50.6,"tpp":30.8},{"name":"Josh Ojianwuna","pos":"F","height":"6-10","year":"R-Sr.","hasStats":true,"ppg":7.4,"rpg":6.4,"apg":0.6,"spg":0.9,"bpg":0.8,"fgp":77.4,"tpp":0.0}]},{"name":"Michigan St.","conf":"Big Ten","players":[{"name":"Jeremy Fears Jr.","pos":"G","height":"6-2","year":"R-Jr.","hasStats":true,"ppg":15.3,"rpg":2.4,"apg":9.4,"spg":1.2,"bpg":0.0,"fgp":43.6,"tpp":32.1},{"name":"Jordan Scott","pos":"G","height":"6-7","year":"So.","hasStats":true,"ppg":5.9,"rpg":3.0,"apg":1.2,"spg":0.8,"bpg":0.5,"fgp":41.1,"tpp":36.7},{"name":"Coen Carr","pos":"F","height":"6-5","year":"Sr.","hasStats":true,"ppg":12.0,"rpg":5.5,"apg":1.2,"spg":0.5,"bpg":0.8,"fgp":51.7,"tpp":28.8},{"name":"Cam Ward","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":5.2,"rpg":4.2,"apg":0.3,"spg":0.4,"bpg":0.5,"fgp":60.0,"tpp":0.0},{"name":"Anton Bonke","pos":"C","height":"7-2","year":"Sr.","hasStats":true,"ppg":10.6,"rpg":8.3,"apg":1.0,"spg":0.2,"bpg":1.5,"fgp":57.6,"tpp":34.2}]},{"name":"Iowa","conf":"Big Ten","players":[{"name":"Kael Combs","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":6.2,"rpg":2.5,"apg":2.3,"spg":0.7,"bpg":0.1,"fgp":48.8,"tpp":34.7},{"name":"Tate Sage","pos":"G","height":"6-7","year":"So.","hasStats":true,"ppg":5.6,"rpg":1.9,"apg":0.6,"spg":0.3,"bpg":0.2,"fgp":48.5,"tpp":35.5},{"name":"Cooper Koch","pos":"F","height":"6-8","year":"R-So.","hasStats":true,"ppg":7.8,"rpg":3.0,"apg":1.1,"spg":0.5,"bpg":0.1,"fgp":44.0,"tpp":40.4},{"name":"Cam Manyawu","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":6.9,"rpg":4.7,"apg":1.0,"spg":0.9,"bpg":0.5,"fgp":63.9,"tpp":0.0},{"name":"Andrew McKeever","pos":"C","height":"7-3","year":"R-Jr.","hasStats":true,"ppg":8.2,"rpg":9.2,"apg":1.8,"spg":0.5,"bpg":0.8,"fgp":50.0,"tpp":0.0}]},{"name":"Purdue","conf":"Big Ten","players":[{"name":"Omer Mayer","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":5.6,"rpg":1.1,"apg":1.2,"spg":0.4,"bpg":0.0,"fgp":41.8,"tpp":37.1},{"name":"C.J. Cox","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":8.5,"rpg":2.6,"apg":1.3,"spg":0.5,"bpg":0.1,"fgp":45.5,"tpp":38.4},{"name":"Gicarri Harris","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":4.5,"rpg":1.6,"apg":0.9,"spg":0.8,"bpg":0.1,"fgp":39.3,"tpp":34.8},{"name":"Caden Pierce","pos":"F","height":"6-7","year":"Sr.","hasStats":true,"ppg":11.2,"rpg":7.2,"apg":3.2,"spg":1.0,"bpg":0.4,"fgp":46.5,"tpp":31.6},{"name":"Daniel Jacobsen","pos":"C","height":"7-4","year":"Jr.","hasStats":true,"ppg":5.8,"rpg":3.2,"apg":0.4,"spg":0.1,"bpg":1.2,"fgp":65.1,"tpp":37.5}]},{"name":"Nebraska","conf":"Big Ten","players":[{"name":"Trevan Leonhardt","pos":"G","height":"6-6","year":"R-Sr.","hasStats":true,"ppg":11.9,"rpg":5.4,"apg":6.0,"spg":2.1,"bpg":0.6,"fgp":50.5,"tpp":36.8},{"name":"Braden Frager","pos":"G","height":"6-7","year":"R-So.","hasStats":true,"ppg":11.7,"rpg":3.8,"apg":1.0,"spg":0.8,"bpg":0.1,"fgp":48.3,"tpp":33.8},{"name":"Pryce Sandfort","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":17.9,"rpg":4.9,"apg":2.0,"spg":1.0,"bpg":0.3,"fgp":47.5,"tpp":41.0},{"name":"Sam Orme","pos":"F","height":"6-10","year":"R-Jr.","hasStats":true,"ppg":12.7,"rpg":5.0,"apg":1.8,"spg":0.9,"bpg":0.7,"fgp":55.9,"tpp":39.7},{"name":"Boden Kapke","pos":"F","height":"7-0","year":"Sr.","hasStats":true,"ppg":10.6,"rpg":5.7,"apg":0.7,"spg":0.4,"bpg":0.4,"fgp":47.9,"tpp":33.3}]},{"name":"Illinois","conf":"Big Ten","players":[{"name":"Quentin Coleman","pos":"G","height":"6-4","year":"Fr.","hasStats":false},{"name":"Stefan Vaaks","pos":"G","height":"6-7","year":"So.","hasStats":true,"ppg":15.8,"rpg":2.5,"apg":3.2,"spg":0.8,"bpg":0.3,"fgp":40.3,"tpp":35.0},{"name":"Andrej Stojakovic","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":13.5,"rpg":4.5,"apg":1.0,"spg":0.4,"bpg":0.5,"fgp":49.2,"tpp":24.1},{"name":"David Mirkovic","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":13.6,"rpg":7.9,"apg":2.7,"spg":0.4,"bpg":0.3,"fgp":49.3,"tpp":38.0},{"name":"Tomislav Ivisic","pos":"F","height":"7-1","year":"Sr.","hasStats":true,"ppg":10.2,"rpg":5.7,"apg":1.6,"spg":0.3,"bpg":0.5,"fgp":48.4,"tpp":31.5}]},{"name":"Minnesota","conf":"Big Ten","players":[{"name":"Kyan Evans","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":4.0,"rpg":1.2,"apg":2.5,"spg":0.5,"bpg":0.0,"fgp":32.8,"tpp":30.5},{"name":"Isaac Asuma","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":11.1,"rpg":4.0,"apg":3.8,"spg":1.3,"bpg":0.5,"fgp":40.0,"tpp":31.0},{"name":"Bobby Durkin","pos":"F","height":"6-7","year":"Sr.","hasStats":true,"ppg":10.3,"rpg":3.1,"apg":1.9,"spg":0.8,"bpg":0.1,"fgp":44.1,"tpp":39.8},{"name":"Jaylen Crocker-Johnson","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":13.4,"rpg":6.8,"apg":1.8,"spg":0.6,"bpg":1.0,"fgp":41.5,"tpp":32.3},{"name":"Grayson Grove","pos":"F","height":"6-9","year":"R-So.","hasStats":true,"ppg":4.1,"rpg":3.1,"apg":1.7,"spg":1.1,"bpg":0.6,"fgp":60.9,"tpp":29.4}]},{"name":"Northwestern","conf":"Big Ten","players":[{"name":"Jake West","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":5.3,"rpg":0.8,"apg":2.8,"spg":0.6,"bpg":0.2,"fgp":40.3,"tpp":36.4},{"name":"LA Pratt","pos":"G","height":"6-5","year":"Gr.","hasStats":true,"ppg":17.0,"rpg":1.7,"apg":3.3,"spg":2.3,"bpg":0.0,"fgp":47.5,"tpp":27.3},{"name":"Jack Karasinski","pos":"F","height":"6-7","year":"Gr.","hasStats":true,"ppg":21.7,"rpg":4.7,"apg":1.2,"spg":0.6,"bpg":0.3,"fgp":56.1,"tpp":41.5},{"name":"Colin Smith","pos":"F","height":"6-8","year":"R-Sr.","hasStats":true,"ppg":11.9,"rpg":4.2,"apg":1.5,"spg":0.5,"bpg":0.2,"fgp":45.5,"tpp":40.5},{"name":"Luke McEldon","pos":"F","height":"6-10","year":"Gr.","hasStats":true,"ppg":11.7,"rpg":6.2,"apg":1.3,"spg":0.4,"bpg":0.6,"fgp":64.5,"tpp":0.0}]},{"name":"Penn State","conf":"Big Ten","players":[{"name":"Jay Rodgers","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":11.0,"rpg":2.2,"apg":6.9,"spg":0.4,"bpg":0.1,"fgp":42.6,"tpp":36.2},{"name":"Roberts Blums","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":12.4,"rpg":3.4,"apg":1.1,"spg":0.6,"bpg":0.0,"fgp":45.6,"tpp":40.7},{"name":"Brant Byers","pos":"G","height":"6-8","year":"R-Jr.","hasStats":true,"ppg":14.2,"rpg":4.1,"apg":0.6,"spg":0.6,"bpg":0.4,"fgp":47.8,"tpp":39.2},{"name":"Roko Prkacin","pos":"F","height":"6-9","year":"??","hasStats":false},{"name":"Ivan Juric","pos":"F","height":"7-0","year":"So.","hasStats":true,"ppg":10.2,"rpg":5.3,"apg":0.8,"spg":0.4,"bpg":0.2,"fgp":57.7,"tpp":28.3}]},{"name":"Rutgers","conf":"Big Ten","players":[{"name":"Tariq Francis","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":16.9,"rpg":2.3,"apg":2.9,"spg":1.1,"bpg":0.0,"fgp":42.7,"tpp":35.7},{"name":"Jamichael Davis","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":7.2,"rpg":2.9,"apg":2.5,"spg":0.9,"bpg":0.2,"fgp":38.5,"tpp":36.3},{"name":"Rasheed Jones","pos":"G","height":"6-6","year":"R-Sr.","hasStats":true,"ppg":14.8,"rpg":4.6,"apg":2.9,"spg":1.0,"bpg":0.5,"fgp":39.8,"tpp":36.7},{"name":"Darren Buchanan Jr.","pos":"F","height":"6-7","year":"R-Sr.","hasStats":true,"ppg":8.4,"rpg":3.8,"apg":1.7,"spg":0.6,"bpg":0.2,"fgp":46.8,"tpp":35.3},{"name":"Christian Gurdak","pos":"C","height":"6-10","year":"So.","hasStats":true,"ppg":5.6,"rpg":4.4,"apg":0.3,"spg":0.3,"bpg":0.4,"fgp":63.2,"tpp":0.0}]},{"name":"Washington","conf":"Big Ten","players":[{"name":"Ryan Beasley","pos":"G","height":"5-11","year":"Sr.","hasStats":true,"ppg":13.6,"rpg":3.4,"apg":4.0,"spg":1.2,"bpg":0.1,"fgp":40.7,"tpp":32.7},{"name":"Wesley Yates III","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":12.7,"rpg":3.3,"apg":1.3,"spg":1.5,"bpg":0.3,"fgp":37.1,"tpp":31.2},{"name":"LeJuan Watts","pos":"F","height":"6-6","year":"R-Sr.","hasStats":true,"ppg":11.8,"rpg":6.0,"apg":2.4,"spg":0.7,"bpg":0.2,"fgp":43.3,"tpp":32.1},{"name":"Nikola Dzepina","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":2.6,"rpg":1.3,"apg":0.7,"spg":0.0,"bpg":0.9,"fgp":30.2,"tpp":25.0},{"name":"Lathan Sommerville","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":4.3,"rpg":2.6,"apg":0.2,"spg":0.1,"bpg":0.4,"fgp":43.8,"tpp":20.0}]},{"name":"USC","conf":"Big Ten","players":[{"name":"Rodney Rice","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":20.3,"rpg":3.3,"apg":6.0,"spg":1.2,"bpg":0.2,"fgp":41.1,"tpp":38.5},{"name":"KJ Lewis","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":14.9,"rpg":5.1,"apg":2.5,"spg":2.1,"bpg":0.6,"fgp":40.8,"tpp":30.5},{"name":"Alijah Arenas","pos":"G","height":"6-6","year":"So.","hasStats":true,"ppg":14.1,"rpg":2.9,"apg":2.1,"spg":0.9,"bpg":0.5,"fgp":34.1,"tpp":21.3},{"name":"Jacob Cofie","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":9.9,"rpg":6.8,"apg":1.9,"spg":0.9,"bpg":1.8,"fgp":51.0,"tpp":31.8},{"name":"Eric Reibe","pos":"C","height":"7-1","year":"So.","hasStats":true,"ppg":6.5,"rpg":3.6,"apg":0.5,"spg":0.3,"bpg":0.8,"fgp":66.0,"tpp":30.8}]},{"name":"Oregon","conf":"Big Ten","players":[{"name":"Fred Payne","pos":"G","height":"6-1","year":"R-Jr.","hasStats":true,"ppg":15.8,"rpg":4.2,"apg":2.7,"spg":1.1,"bpg":0.2,"fgp":39.9,"tpp":31.5},{"name":"Jasper Johnson","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":4.9,"rpg":1.1,"apg":1.6,"spg":0.1,"bpg":0.1,"fgp":40.0,"tpp":34.1},{"name":"Tyrone Riley IV","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":12.2,"rpg":4.8,"apg":1.2,"spg":1.0,"bpg":0.5,"fgp":47.2,"tpp":36.8},{"name":"Dwayne Aristode","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":4.1,"rpg":1.8,"apg":0.8,"spg":0.5,"bpg":0.1,"fgp":48.4,"tpp":45.3},{"name":"Sean Stewart","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":6.5,"rpg":5.2,"apg":1.2,"spg":0.9,"bpg":0.4,"fgp":50.9,"tpp":100.0}]},{"name":"UCLA","conf":"Big Ten","players":[{"name":"Trent Perry","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":12.6,"rpg":3.0,"apg":2.8,"spg":0.9,"bpg":0.1,"fgp":43.6,"tpp":39.2},{"name":"Jaylen Petty","pos":"G","height":"6-1","year":"So.","hasStats":true,"ppg":9.9,"rpg":3.9,"apg":2.2,"spg":0.6,"bpg":0.0,"fgp":40.6,"tpp":37.5},{"name":"Nikola Kusturica","pos":"G","height":"6-9","year":"Fr.","hasStats":false},{"name":"Eric Dailey Jr.","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":11.6,"rpg":5.8,"apg":1.3,"spg":0.9,"bpg":0.3,"fgp":48.6,"tpp":31.6},{"name":"Xavier Booker","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":7.3,"rpg":3.5,"apg":0.8,"spg":0.2,"bpg":1.2,"fgp":54.7,"tpp":43.3}]},{"name":"Kansas","conf":"Big 12","players":[{"name":"Leroy Blyden Jr.","pos":"G","height":"6-1","year":"So.","hasStats":true,"ppg":16.4,"rpg":4.0,"apg":4.5,"spg":1.8,"bpg":0.3,"fgp":46.1,"tpp":40.7},{"name":"Kohl Rosario","pos":"G","height":"6-6","year":"So.","hasStats":true,"ppg":3.4,"rpg":1.3,"apg":0.4,"spg":0.3,"bpg":0.2,"fgp":42.5,"tpp":28.6},{"name":"Tyran Stokes","pos":"F","height":"6-8","year":"Fr.","hasStats":false},{"name":"Keanu Dawes","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":12.5,"rpg":8.8,"apg":2.2,"spg":0.5,"bpg":0.4,"fgp":54.6,"tpp":31.7},{"name":"Paul Mbiya","pos":"C","height":"7-0","year":"So.","hasStats":true,"ppg":1.2,"rpg":1.4,"apg":0.0,"spg":0.0,"bpg":0.2,"fgp":68.8,"tpp":0.0}]},{"name":"Cincinnati","conf":"Big 12","players":[{"name":"Tylen Riley","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":15.0,"rpg":3.9,"apg":4.4,"spg":0.9,"bpg":0.1,"fgp":45.9,"tpp":39.7},{"name":"Myles Colvin","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":11.6,"rpg":4.4,"apg":1.4,"spg":1.2,"bpg":0.3,"fgp":40.3,"tpp":36.0},{"name":"Eric Mahaffey","pos":"F","height":"6-6","year":"R-So.","hasStats":true,"ppg":7.8,"rpg":5.6,"apg":1.5,"spg":0.7,"bpg":0.6,"fgp":53.0,"tpp":39.1},{"name":"Adlan Elamin","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":6.7,"rpg":3.1,"apg":0.9,"spg":0.7,"bpg":0.5,"fgp":44.4,"tpp":30.2},{"name":"Jayden Hastings","pos":"F","height":"6-10","year":"R-Jr.","hasStats":true,"ppg":6.7,"rpg":5.6,"apg":0.7,"spg":0.6,"bpg":1.5,"fgp":61.1,"tpp":0.0}]},{"name":"Houston","conf":"Big 12","players":[{"name":"Dedan Thomas Jr.","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":15.3,"rpg":2.7,"apg":6.5,"spg":0.9,"bpg":0.3,"fgp":45.9,"tpp":30.2},{"name":"Mercy Miller","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":5.2,"rpg":1.9,"apg":0.5,"spg":0.6,"bpg":0.2,"fgp":49.6,"tpp":36.2},{"name":"Chase McCarty","pos":"F","height":"6-5","year":"R-So.","hasStats":true,"ppg":4.0,"rpg":2.5,"apg":0.1,"spg":0.4,"bpg":0.3,"fgp":40.7,"tpp":35.2},{"name":"Delrecco Gillespie","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":17.7,"rpg":11.3,"apg":1.7,"spg":1.0,"bpg":1.2,"fgp":50.8,"tpp":27.0},{"name":"Joseph Tugler","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":8.5,"rpg":5.3,"apg":1.2,"spg":1.3,"bpg":1.5,"fgp":57.3,"tpp":100.0}]},{"name":"UCF","conf":"Big 12","players":[{"name":"Arturo Dean","pos":"G","height":"5-11","year":"R-Sr.","hasStats":true,"ppg":7.6,"rpg":3.1,"apg":3.4,"spg":2.5,"bpg":0.0,"fgp":39.6,"tpp":27.5},{"name":"Dior Johnson","pos":"G","height":"6-3","year":"R-Sr.","hasStats":true,"ppg":24.0,"rpg":3.3,"apg":1.6,"spg":1.2,"bpg":0.1,"fgp":51.8,"tpp":53.8},{"name":"Mister Dean","pos":"G","height":"6-6","year":"R-So.","hasStats":true,"ppg":10.3,"rpg":3.7,"apg":3.0,"spg":1.3,"bpg":0.3,"fgp":52.6,"tpp":0.0},{"name":"Isaiah Malone","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":10.5,"rpg":5.8,"apg":0.5,"spg":0.6,"bpg":1.9,"fgp":59.2,"tpp":44.0},{"name":"John Bol","pos":"C","height":"7-2","year":"Jr.","hasStats":true,"ppg":5.9,"rpg":5.5,"apg":0.3,"spg":0.3,"bpg":1.1,"fgp":71.7,"tpp":0.0}]},{"name":"BYU","conf":"Big 12","players":[{"name":"Robert Wright III","pos":"G","height":"6-1","year":"Jr.","hasStats":true,"ppg":18.1,"rpg":3.5,"apg":4.6,"spg":1.2,"bpg":0.0,"fgp":46.7,"tpp":41.0},{"name":"Collin Chandler","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":9.7,"rpg":2.8,"apg":2.3,"spg":1.2,"bpg":0.3,"fgp":43.5,"tpp":41.0},{"name":"Bruce Branch III","pos":"G","height":"6-7","year":"Fr.","hasStats":false},{"name":"Tyler Betsey","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":6.7,"rpg":2.8,"apg":0.4,"spg":0.3,"bpg":0.2,"fgp":40.2,"tpp":40.7},{"name":"Khadim Mboup","pos":"F","height":"6-9","year":"R-So.","hasStats":true,"ppg":2.2,"rpg":5.1,"apg":0.4,"spg":0.6,"bpg":0.5,"fgp":49.3,"tpp":16.7}]},{"name":"Iowa St.","conf":"Big 12","players":[{"name":"Jaquan Johnson","pos":"G","height":"5-11","year":"Jr.","hasStats":true,"ppg":16.9,"rpg":3.9,"apg":3.6,"spg":2.5,"bpg":0.0,"fgp":42.3,"tpp":38.3},{"name":"Killyan Toure","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":8.6,"rpg":3.4,"apg":2.3,"spg":1.4,"bpg":0.2,"fgp":46.0,"tpp":30.5},{"name":"Jamarion Batemon","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":6.8,"rpg":1.2,"apg":0.4,"spg":0.6,"bpg":0.1,"fgp":39.4,"tpp":37.8},{"name":"Tre Singleton","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":7.6,"rpg":4.8,"apg":1.5,"spg":0.6,"bpg":0.6,"fgp":47.7,"tpp":16.7},{"name":"Blake Buchanan","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":8.5,"rpg":5.8,"apg":1.7,"spg":0.8,"bpg":0.9,"fgp":63.1,"tpp":0.0}]},{"name":"Baylor","conf":"Big 12","players":[{"name":"Kayden Mingo","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":13.7,"rpg":3.5,"apg":4.3,"spg":2.1,"bpg":0.2,"fgp":47.7,"tpp":24.4},{"name":"Dylan Mingo","pos":"G","height":"6-5","year":"Fr.","hasStats":false},{"name":"Elijah Williams","pos":"F","height":"6-6","year":"Fr.","hasStats":false},{"name":"Isaac Celiscar","pos":"F","height":"6-6","year":"Jr.","hasStats":true,"ppg":13.2,"rpg":6.3,"apg":3.2,"spg":0.7,"bpg":0.3,"fgp":57.3,"tpp":40.7},{"name":"Juslin Bodo Bodo","pos":"F","height":"6-11","year":"R-Jr.","hasStats":true,"ppg":5.3,"rpg":8.4,"apg":0.2,"spg":0.6,"bpg":1.4,"fgp":64.3,"tpp":0.0}]},{"name":"West Virginia","conf":"Big 12","players":[{"name":"Miles Sadler","pos":"G","height":"6-0","year":"Fr.","hasStats":false},{"name":"Finley Bizjack","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":17.1,"rpg":2.2,"apg":2.5,"spg":0.7,"bpg":0.1,"fgp":42.6,"tpp":34.9},{"name":"Joson Sanon","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":8.1,"rpg":2.5,"apg":0.7,"spg":0.6,"bpg":0.2,"fgp":34.4,"tpp":34.3},{"name":"Seydou Traore","pos":"G","height":"6-6","year":"Sr.","hasStats":true,"ppg":9.0,"rpg":3.4,"apg":2.0,"spg":1.2,"bpg":0.5,"fgp":38.6,"tpp":33.3},{"name":"Mouhamed Sylla","pos":"C","height":"6-10","year":"So.","hasStats":true,"ppg":9.6,"rpg":7.2,"apg":0.6,"spg":0.8,"bpg":1.2,"fgp":57.9,"tpp":25.0}]},{"name":"TCU","conf":"Big 12","players":[{"name":"Brock Harding","pos":"G","height":"6-0","year":"Sr.","hasStats":true,"ppg":8.0,"rpg":2.9,"apg":5.6,"spg":1.7,"bpg":0.1,"fgp":37.2,"tpp":28.4},{"name":"Trent Lincoln","pos":"G","height":"6-3","year":"Jr.","hasStats":false},{"name":"Micah Robinson","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":10.9,"rpg":4.7,"apg":1.7,"spg":1.2,"bpg":0.3,"fgp":39.2,"tpp":33.3},{"name":"Xavier Edmonds","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":12.7,"rpg":6.5,"apg":1.2,"spg":1.0,"bpg":0.9,"fgp":57.0,"tpp":43.6},{"name":"Luke Bamgboye","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":4.5,"rpg":3.4,"apg":0.5,"spg":0.3,"bpg":1.7,"fgp":50.8,"tpp":0.0}]},{"name":"Texas Tech","conf":"Big 12","players":[{"name":"Cruz Davis","pos":"G","height":"6-3","year":"??","hasStats":true,"ppg":20.1,"rpg":3.7,"apg":4.7,"spg":1.1,"bpg":0.3,"fgp":44.0,"tpp":40.0},{"name":"Dra Gibbs-Lawhorn","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":20.7,"rpg":3.1,"apg":2.5,"spg":1.5,"bpg":0.5,"fgp":49.7,"tpp":41.4},{"name":"DaKari Spear","pos":"G","height":"6-5","year":"Fr.","hasStats":false},{"name":"Josiah Moseley","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":5.5,"rpg":3.6,"apg":0.5,"spg":0.3,"bpg":1.1,"fgp":68.6,"tpp":50.0},{"name":"Bassala Bagayoko","pos":"F","height":"6-10","year":"Fr.","hasStats":false}]},{"name":"Kansas St.","conf":"Big 12","players":[{"name":"Brandon Rechsteiner","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":12.0,"rpg":2.2,"apg":2.5,"spg":0.8,"bpg":0.1,"fgp":45.1,"tpp":40.0},{"name":"Jaden Schutt","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":7.7,"rpg":1.6,"apg":0.9,"spg":0.5,"bpg":0.0,"fgp":38.4,"tpp":38.5},{"name":"Dezdrick Lindsay","pos":"G","height":"6-6","year":"Sr.","hasStats":true,"ppg":5.3,"rpg":2.8,"apg":1.5,"spg":0.8,"bpg":0.2,"fgp":40.3,"tpp":32.8},{"name":"Isaiah Abraham","pos":"F","height":"6-7","year":"Jr.","hasStats":true,"ppg":4.8,"rpg":2.9,"apg":0.7,"spg":0.5,"bpg":0.3,"fgp":38.5,"tpp":32.5},{"name":"JT Rock","pos":"F","height":"7-1","year":"R-Jr.","hasStats":true,"ppg":6.0,"rpg":3.4,"apg":0.4,"spg":0.2,"bpg":0.9,"fgp":54.8,"tpp":40.4}]},{"name":"Oklahoma St.","conf":"Big 12","players":[{"name":"Kanye Clary","pos":"G","height":"6-0","year":"R-Sr.","hasStats":true,"ppg":10.6,"rpg":2.9,"apg":4.6,"spg":1.2,"bpg":0.0,"fgp":38.5,"tpp":35.5},{"name":"Luka Bogavac","pos":"G","height":"6-6","year":"Sr.","hasStats":true,"ppg":9.8,"rpg":2.5,"apg":2.2,"spg":0.4,"bpg":0.0,"fgp":40.2,"tpp":34.9},{"name":"Latrell Allmond","pos":"F","height":"6-8","year":"Fr.","hasStats":false},{"name":"Jordan Burks","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":13.3,"rpg":4.8,"apg":0.7,"spg":1.0,"bpg":0.5,"fgp":45.5,"tpp":37.3},{"name":"Julius Halaifonua","pos":"F","height":"7-0","year":"Jr.","hasStats":true,"ppg":9.5,"rpg":4.4,"apg":1.3,"spg":0.3,"bpg":0.7,"fgp":60.8,"tpp":27.3}]},{"name":"Utah","conf":"Big 12","players":[{"name":"TJ Burch","pos":"G","height":"6-1","year":"Jr.","hasStats":true,"ppg":12.4,"rpg":2.4,"apg":3.6,"spg":2.6,"bpg":0.3,"fgp":45.7,"tpp":34.7},{"name":"Taison Chatman","pos":"G","height":"6-4","year":"R-Jr.","hasStats":true,"ppg":4.3,"rpg":1.2,"apg":0.8,"spg":0.4,"bpg":0.1,"fgp":46.0,"tpp":47.1},{"name":"Jackson Holcombe","pos":"G","height":"6-7","year":"R-Jr.","hasStats":true,"ppg":16.0,"rpg":7.0,"apg":3.6,"spg":2.2,"bpg":1.3,"fgp":53.0,"tpp":16.2},{"name":"Babacar Faye","pos":"F","height":"6-8","year":"6th","hasStats":true,"ppg":15.2,"rpg":7.8,"apg":0.7,"spg":1.1,"bpg":0.7,"fgp":53.7,"tpp":38.5},{"name":"Fynn Schott","pos":"F","height":"6-10","year":"Fr.","hasStats":false}]},{"name":"Arizona","conf":"Big 12","players":[{"name":"Derek Dixon","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":6.5,"rpg":2.3,"apg":2.7,"spg":0.4,"bpg":0.0,"fgp":36.5,"tpp":39.7},{"name":"Caleb Holt","pos":"G","height":"6-5","year":"Fr.","hasStats":false},{"name":"Cameron Holmes","pos":"G","height":"6-6","year":"Fr.","hasStats":false},{"name":"Ivan Kharchenkov","pos":"F","height":"6-7","year":"So.","hasStats":true,"ppg":10.2,"rpg":4.3,"apg":2.3,"spg":1.4,"bpg":0.3,"fgp":48.9,"tpp":32.7},{"name":"Motiejus Krivas","pos":"C","height":"7-2","year":"Sr.","hasStats":true,"ppg":10.4,"rpg":8.2,"apg":1.0,"spg":0.7,"bpg":1.9,"fgp":57.3,"tpp":30.8}]},{"name":"Arizona St.","conf":"Big 12","players":[{"name":"Joel Foxwell","pos":"G","height":"6-1","year":"So.","hasStats":true,"ppg":15.6,"rpg":4.3,"apg":6.5,"spg":1.5,"bpg":0.1,"fgp":39.3,"tpp":31.9},{"name":"Emmanuel Innocenti","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":6.0,"rpg":3.8,"apg":1.7,"spg":1.0,"bpg":0.3,"fgp":46.9,"tpp":28.4},{"name":"Dillan Shaw","pos":"G","height":"6-7","year":"So.","hasStats":true,"ppg":7.5,"rpg":5.4,"apg":1.5,"spg":0.9,"bpg":0.6,"fgp":42.9,"tpp":41.6},{"name":"Paulius Murauskas","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":18.4,"rpg":7.6,"apg":2.1,"spg":0.6,"bpg":0.5,"fgp":48.2,"tpp":33.3},{"name":"Ben Defty","pos":"C","height":"7-0","year":"Jr.","hasStats":true,"ppg":15.1,"rpg":6.8,"apg":1.9,"spg":0.4,"bpg":1.7,"fgp":69.4,"tpp":0.0}]},{"name":"Colorado","conf":"Big 12","players":[{"name":"Barrington Hargress","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":14.2,"rpg":2.1,"apg":4.5,"spg":0.9,"bpg":0.1,"fgp":53.1,"tpp":48.5},{"name":"Jalin Holland","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":5.0,"rpg":2.5,"apg":0.8,"spg":0.8,"bpg":0.4,"fgp":40.7,"tpp":28.6},{"name":"Josiah Sanders","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":4.3,"rpg":2.4,"apg":1.7,"spg":0.4,"bpg":0.0,"fgp":47.5,"tpp":12.5},{"name":"Justin Neely","pos":"F","height":"6-6","year":"Gr.","hasStats":true,"ppg":17.9,"rpg":11.5,"apg":2.4,"spg":0.9,"bpg":0.2,"fgp":54.2,"tpp":31.4},{"name":"Noah Feddersen","pos":"C","height":"6-10","year":"Sr.","hasStats":true,"ppg":9.3,"rpg":5.0,"apg":1.0,"spg":0.4,"bpg":1.0,"fgp":51.5,"tpp":29.3}]},{"name":"Kentucky","conf":"SEC","players":[{"name":"Zoom Diallo","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":15.7,"rpg":3.9,"apg":4.5,"spg":0.7,"bpg":0.0,"fgp":48.9,"tpp":31.5},{"name":"Alex Wilkins","pos":"G","height":"6-6","year":"So.","hasStats":true,"ppg":17.8,"rpg":2.0,"apg":4.7,"spg":0.8,"bpg":0.1,"fgp":46.0,"tpp":32.8},{"name":"Kam Williams","pos":"G","height":"6-7","year":"Jr.","hasStats":true,"ppg":6.0,"rpg":2.1,"apg":1.0,"spg":0.6,"bpg":0.3,"fgp":44.9,"tpp":35.9},{"name":"Milan Momcilovic","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":17.2,"rpg":3.2,"apg":1.0,"spg":0.8,"bpg":0.3,"fgp":51.2,"tpp":49.3},{"name":"Malachi Moreno","pos":"C","height":"7-0","year":"So.","hasStats":true,"ppg":7.8,"rpg":6.3,"apg":1.8,"spg":0.5,"bpg":1.5,"fgp":58.2,"tpp":0.0}]},{"name":"LSU","conf":"SEC","players":[{"name":"Saliou Niang","pos":"G","height":"6-5","year":"??","hasStats":false},{"name":"Abdi Bashir Jr.","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":13.2,"rpg":2.2,"apg":2.3,"spg":0.5,"bpg":0.0,"fgp":42.1,"tpp":44.4},{"name":"Mouhamed Dioubate","pos":"F","height":"6-7","year":"Sr.","hasStats":true,"ppg":8.8,"rpg":5.5,"apg":1.0,"spg":1.0,"bpg":1.0,"fgp":54.2,"tpp":21.4},{"name":"Brice Dessert","pos":"F","height":"6-11","year":"??","hasStats":false}]},{"name":"Arkansas","conf":"SEC","players":[{"name":"Jordan Smith Jr.","pos":"G","height":"6-2","year":"Fr.","hasStats":false},{"name":"Jeremiah Wilkinson","pos":"G","height":"6-1","year":"Jr.","hasStats":true,"ppg":17.4,"rpg":2.0,"apg":1.7,"spg":1.6,"bpg":0.3,"fgp":41.0,"tpp":35.7},{"name":"Billy Richmond III","pos":"G","height":"6-7","year":"Jr.","hasStats":true,"ppg":11.1,"rpg":4.3,"apg":2.0,"spg":1.1,"bpg":0.8,"fgp":56.2,"tpp":25.0},{"name":"Miikka Muurinen","pos":"F","height":"7-0","year":"Fr.","hasStats":false},{"name":"Cooper Bowser","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":13.8,"rpg":5.9,"apg":1.8,"spg":0.6,"bpg":1.2,"fgp":76.6,"tpp":0.0}]},{"name":"Texas A&M","conf":"SEC","players":[{"name":"Jalen Reece","pos":"G","height":"6-0","year":"So.","hasStats":true,"ppg":5.8,"rpg":1.8,"apg":3.6,"spg":0.9,"bpg":0.1,"fgp":35.8,"tpp":29.9},{"name":"PJ Haggerty","pos":"G","height":"6-4","year":"Gr.","hasStats":true,"ppg":23.4,"rpg":5.3,"apg":3.8,"spg":1.2,"bpg":0.0,"fgp":48.9,"tpp":35.1},{"name":"Bryson Warren","pos":"G","height":"6-3","year":"Fr.","hasStats":false},{"name":"Mackenzie Mgbako","pos":"F","height":"6-9","year":"R-Jr.","hasStats":true,"ppg":10.4,"rpg":4.9,"apg":1.3,"spg":0.6,"bpg":0.1,"fgp":39.0,"tpp":34.3},{"name":"Zach Clemence","pos":"F","height":"6-11","year":"Gr.","hasStats":true,"ppg":6.9,"rpg":3.2,"apg":0.9,"spg":0.6,"bpg":0.4,"fgp":46.4,"tpp":40.0}]},{"name":"Ole Miss","conf":"SEC","players":[{"name":"Adam Clark","pos":"G","height":"5-10","year":"Sr.","hasStats":true,"ppg":12.7,"rpg":3.0,"apg":4.9,"spg":2.0,"bpg":0.1,"fgp":43.7,"tpp":22.0},{"name":"Ilias Kamardine","pos":"G","height":"6-4","year":"??","hasStats":true,"ppg":11.3,"rpg":3.4,"apg":3.8,"spg":1.3,"bpg":0.4,"fgp":42.1,"tpp":29.3},{"name":"Patton Pinkins","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":9.3,"rpg":1.9,"apg":0.9,"spg":0.5,"bpg":0.1,"fgp":46.5,"tpp":42.2},{"name":"Roman Siulepa","pos":"F","height":"6-7","year":"So.","hasStats":true,"ppg":10.0,"rpg":5.5,"apg":0.9,"spg":1.0,"bpg":0.6,"fgp":46.1,"tpp":29.6},{"name":"Santiago Trouet","pos":"C","height":"6-11","year":"Sr.","hasStats":true,"ppg":8.1,"rpg":6.1,"apg":0.9,"spg":0.7,"bpg":0.7,"fgp":44.8,"tpp":20.8}]},{"name":"Florida","conf":"SEC","players":[{"name":"Boogie Fland","pos":"G","height":"6-2","year":"Jr.","hasStats":true,"ppg":11.6,"rpg":2.5,"apg":3.5,"spg":1.7,"bpg":0.1,"fgp":44.7,"tpp":24.0},{"name":"Denzel Aberdeen","pos":"G","height":"6-5","year":"??","hasStats":true,"ppg":13.5,"rpg":2.5,"apg":3.4,"spg":0.7,"bpg":0.1,"fgp":43.3,"tpp":36.3},{"name":"Thomas Haugh","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":17.1,"rpg":6.1,"apg":2.1,"spg":1.1,"bpg":1.0,"fgp":46.0,"tpp":32.6},{"name":"Alex Condon","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":15.1,"rpg":7.5,"apg":3.6,"spg":0.7,"bpg":1.4,"fgp":55.6,"tpp":17.0},{"name":"Rueben Chinyelu","pos":"C","height":"6-10","year":"Sr.","hasStats":true,"ppg":10.9,"rpg":11.2,"apg":0.7,"spg":0.8,"bpg":1.0,"fgp":58.4,"tpp":0.0}]},{"name":"Georgia","conf":"SEC","players":[{"name":"Marcus Millender","pos":"G","height":"5-11","year":"Sr.","hasStats":true,"ppg":12.0,"rpg":2.8,"apg":4.1,"spg":0.9,"bpg":0.0,"fgp":45.2,"tpp":38.6},{"name":"Blue Cain","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":13.1,"rpg":5.1,"apg":2.6,"spg":1.4,"bpg":0.2,"fgp":46.8,"tpp":30.0},{"name":"Kanon Catchings","pos":"F","height":"6-9","year":"Jr.","hasStats":true,"ppg":11.6,"rpg":4.8,"apg":1.2,"spg":0.8,"bpg":0.4,"fgp":42.3,"tpp":37.6},{"name":"Kareem Stagg","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":4.8,"rpg":2.4,"apg":0.6,"spg":0.4,"bpg":0.4,"fgp":50.5,"tpp":30.0},{"name":"James Scott","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":3.9,"rpg":4.6,"apg":0.6,"spg":0.5,"bpg":1.3,"fgp":72.9,"tpp":0.0}]},{"name":"Mizzou","conf":"SEC","players":[{"name":"Jason Crowe Jr.","pos":"G","height":"6-3","year":"Fr.","hasStats":false},{"name":"Jamier Jones","pos":"G","height":"6-6","year":"So.","hasStats":true,"ppg":11.9,"rpg":4.5,"apg":1.4,"spg":0.9,"bpg":0.3,"fgp":57.0,"tpp":38.7},{"name":"Trent Pierce","pos":"G","height":"6-10","year":"Sr.","hasStats":true,"ppg":10.4,"rpg":3.8,"apg":1.2,"spg":1.1,"bpg":0.3,"fgp":47.8,"tpp":38.4},{"name":"Jaylen Carey","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":7.3,"rpg":6.0,"apg":1.3,"spg":0.3,"bpg":0.1,"fgp":47.9,"tpp":0.0},{"name":"Bryson Tiller","pos":"F","height":"6-10","year":"So.","hasStats":true,"ppg":7.9,"rpg":6.1,"apg":1.0,"spg":0.3,"bpg":1.3,"fgp":44.9,"tpp":26.9}]},{"name":"Vanderbilt","conf":"SEC","players":[{"name":"Tyler Tanner","pos":"G","height":"6-0","year":"Jr.","hasStats":true,"ppg":19.5,"rpg":3.6,"apg":5.1,"spg":2.4,"bpg":0.3,"fgp":48.5,"tpp":36.8},{"name":"Ace Glass III","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":16.4,"rpg":3.0,"apg":2.3,"spg":0.8,"bpg":0.1,"fgp":45.5,"tpp":36.4},{"name":"Gabe Nesmith","pos":"G","height":"6-5","year":"Fr.","hasStats":false},{"name":"Berke Buyuktuncel","pos":"F","height":"6-10","year":"Gr.","hasStats":true,"ppg":6.7,"rpg":5.4,"apg":1.8,"spg":0.9,"bpg":1.0,"fgp":48.2,"tpp":26.0},{"name":"Bangot Dak","pos":"F","height":"7-0","year":"Sr.","hasStats":true,"ppg":11.5,"rpg":6.5,"apg":1.4,"spg":0.7,"bpg":1.6,"fgp":49.2,"tpp":25.9}]},{"name":"Alabama","conf":"SEC","players":[{"name":"Aden Holloway","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":16.8,"rpg":2.8,"apg":3.8,"spg":0.6,"bpg":0.0,"fgp":48.1,"tpp":43.8},{"name":"Amari Allen","pos":"G","height":"6-8","year":"So.","hasStats":true,"ppg":11.6,"rpg":7.0,"apg":3.1,"spg":1.1,"bpg":0.7,"fgp":45.3,"tpp":35.1},{"name":"London Jemison","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":6.2,"rpg":3.4,"apg":0.4,"spg":0.7,"bpg":0.3,"fgp":44.2,"tpp":34.9},{"name":"Drew Fielder","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":14.7,"rpg":5.7,"apg":1.3,"spg":0.4,"bpg":0.5,"fgp":54.7,"tpp":40.9},{"name":"Brandon Garrison","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":4.7,"rpg":4.1,"apg":1.1,"spg":0.5,"bpg":0.8,"fgp":55.6,"tpp":23.5}]},{"name":"Mississippi St.","conf":"SEC","players":[{"name":"Josh Hubbard","pos":"G","height":"6-0","year":"Sr.","hasStats":true,"ppg":22.1,"rpg":2.5,"apg":3.6,"spg":1.2,"bpg":0.1,"fgp":42.2,"tpp":34.7},{"name":"RJ Johnson","pos":"G","height":"6-4","year":"R-Jr.","hasStats":true,"ppg":14.5,"rpg":3.1,"apg":4.0,"spg":1.2,"bpg":0.4,"fgp":45.3,"tpp":42.3},{"name":"King Grace","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":5.1,"rpg":1.3,"apg":0.4,"spg":0.4,"bpg":0.3,"fgp":43.8,"tpp":31.9},{"name":"Thomas Bassong","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":5.9,"rpg":3.5,"apg":0.4,"spg":0.6,"bpg":0.4,"fgp":48.6,"tpp":26.0},{"name":"ND Okafor","pos":"F","height":"6-10","year":"R-Sr.","hasStats":true,"ppg":11.0,"rpg":5.7,"apg":0.9,"spg":0.5,"bpg":1.4,"fgp":58.3,"tpp":0.0}]},{"name":"South Carolina","conf":"SEC","players":[{"name":"Kory Mincy","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":14.3,"rpg":3.6,"apg":2.9,"spg":1.1,"bpg":0.0,"fgp":44.0,"tpp":38.9},{"name":"Shane Blakeney","pos":"G","height":"6-5","year":"Gr.","hasStats":true,"ppg":14.2,"rpg":5.1,"apg":2.5,"spg":1.1,"bpg":0.7,"fgp":41.6,"tpp":35.9},{"name":"Camden Heide","pos":"G","height":"6-7","year":"R-Sr.","hasStats":true,"ppg":5.9,"rpg":2.6,"apg":0.6,"spg":0.4,"bpg":0.1,"fgp":50.0,"tpp":46.2},{"name":"Juan Fernandez","pos":"F","height":"6-11","year":"??","hasStats":false},{"name":"Aleksas Bieliauskas","pos":"F","height":"6-11","year":"So.","hasStats":true,"ppg":4.9,"rpg":4.4,"apg":0.9,"spg":0.2,"bpg":0.6,"fgp":43.1,"tpp":34.6}]},{"name":"Auburn","conf":"SEC","players":[{"name":"Tahaad Pettiford","pos":"G","height":"6-1","year":"Jr.","hasStats":true,"ppg":15.3,"rpg":3.0,"apg":3.7,"spg":1.1,"bpg":0.6,"fgp":39.4,"tpp":28.4},{"name":"Kevin Overton","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":13.7,"rpg":3.4,"apg":1.2,"spg":1.1,"bpg":0.2,"fgp":43.5,"tpp":39.2},{"name":"Mantas Rubstavicius","pos":"G","height":"6-6","year":"??","hasStats":false},{"name":"Thomas Dowd","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":14.4,"rpg":10.1,"apg":2.1,"spg":1.2,"bpg":1.3,"fgp":44.1,"tpp":33.3},{"name":"Bukky Oboye","pos":"C","height":"7-1","year":"R-Jr.","hasStats":true,"ppg":7.9,"rpg":4.1,"apg":0.6,"spg":0.7,"bpg":1.2,"fgp":66.7,"tpp":24.2}]},{"name":"Tennessee","conf":"SEC","players":[{"name":"Dai Dai Ames","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":16.9,"rpg":2.0,"apg":2.2,"spg":0.7,"bpg":0.1,"fgp":46.4,"tpp":37.6},{"name":"Terrence Hill Jr.","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":15.0,"rpg":2.7,"apg":2.8,"spg":0.6,"bpg":0.1,"fgp":46.6,"tpp":37.0},{"name":"Juke Harris","pos":"G","height":"6-7","year":"Jr.","hasStats":true,"ppg":21.4,"rpg":6.5,"apg":1.9,"spg":1.3,"bpg":0.2,"fgp":44.4,"tpp":33.2},{"name":"Jalen Haralson","pos":"G","height":"6-7","year":"So.","hasStats":true,"ppg":16.2,"rpg":4.0,"apg":2.6,"spg":0.5,"bpg":0.3,"fgp":51.5,"tpp":20.0},{"name":"DeWayne Brown II","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":4.8,"rpg":3.7,"apg":0.9,"spg":0.2,"bpg":0.4,"fgp":57.8,"tpp":0.0}]},{"name":"Texas","conf":"SEC","players":[{"name":"Isaiah Johnson","pos":"G","height":"6-1","year":"So.","hasStats":true,"ppg":16.9,"rpg":2.9,"apg":3.0,"spg":1.0,"bpg":0.0,"fgp":48.6,"tpp":37.8},{"name":"Mikey Lewis","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":13.9,"rpg":2.7,"apg":2.1,"spg":0.7,"bpg":0.3,"fgp":39.8,"tpp":36.8},{"name":"Elyjah Freeman","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":9.4,"rpg":5.1,"apg":1.2,"spg":1.2,"bpg":0.6,"fgp":44.6,"tpp":35.0},{"name":"David Punch","pos":"F","height":"6-7","year":"Jr.","hasStats":true,"ppg":14.1,"rpg":6.8,"apg":2.0,"spg":1.3,"bpg":1.9,"fgp":50.3,"tpp":23.9},{"name":"Matas Vokietaitis","pos":"C","height":"7-0","year":"Sr.","hasStats":true,"ppg":15.7,"rpg":7.2,"apg":0.7,"spg":0.2,"bpg":0.9,"fgp":61.9,"tpp":0.0}]},{"name":"Oklahoma","conf":"SEC","players":[{"name":"Xzayvier Brown","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":15.3,"rpg":3.2,"apg":3.2,"spg":1.3,"bpg":0.2,"fgp":46.1,"tpp":36.0},{"name":"Pop Isaacs","pos":"G","height":"6-2","year":"5th","hasStats":true,"ppg":9.8,"rpg":2.5,"apg":2.6,"spg":0.7,"bpg":0.1,"fgp":42.2,"tpp":39.6},{"name":"Derrion Reid","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":11.8,"rpg":4.6,"apg":1.1,"spg":0.5,"bpg":0.3,"fgp":50.4,"tpp":35.6},{"name":"Khani Rooths","pos":"F","height":"6-9","year":"Jr.","hasStats":true,"ppg":5.3,"rpg":4.3,"apg":1.0,"spg":0.6,"bpg":0.5,"fgp":44.9,"tpp":22.4},{"name":"Kai Rogers","pos":"F","height":"6-10","year":"So.","hasStats":true,"ppg":1.3,"rpg":1.5,"apg":0.4,"spg":0.3,"bpg":0.3,"fgp":64.7,"tpp":0.0}]},{"name":"Villanova","conf":"Big East","players":[{"name":"Elijah Crawford","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":14.1,"rpg":2.9,"apg":4.9,"spg":1.4,"bpg":0.3,"fgp":45.3,"tpp":27.6},{"name":"Tyler Perkins","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":13.7,"rpg":5.4,"apg":1.6,"spg":1.2,"bpg":0.3,"fgp":44.0,"tpp":36.9},{"name":"Devin Royal","pos":"F","height":"6-6","year":"Sr.","hasStats":true,"ppg":13.7,"rpg":5.7,"apg":1.6,"spg":0.6,"bpg":0.2,"fgp":47.6,"tpp":31.6},{"name":"Kwame Evans Jr.","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":13.3,"rpg":7.4,"apg":2.0,"spg":1.0,"bpg":1.3,"fgp":45.4,"tpp":30.4},{"name":"Luigi Suigo","pos":"C","height":"7-3","year":"Fr.","hasStats":false}]},{"name":"Xavier","conf":"Big East","players":[{"name":"Chance Westry","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":15.5,"rpg":3.8,"apg":5.5,"spg":1.3,"bpg":0.5,"fgp":48.7,"tpp":24.1},{"name":"Tru Washington","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":11.9,"rpg":4.0,"apg":1.8,"spg":1.8,"bpg":0.0,"fgp":44.3,"tpp":35.2},{"name":"Rub\u00e9n Dominguez","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":10.2,"rpg":2.3,"apg":1.4,"spg":0.4,"bpg":0.1,"fgp":40.7,"tpp":40.0},{"name":"Jovan Milicevic","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":12.4,"rpg":3.9,"apg":1.4,"spg":0.7,"bpg":0.6,"fgp":44.3,"tpp":42.9},{"name":"Michael Nwoko","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":13.4,"rpg":5.9,"apg":0.8,"spg":0.4,"bpg":0.8,"fgp":61.0,"tpp":0.0}]},{"name":"Connecticut","conf":"Big East","players":[{"name":"Silas Demary Jr.","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":10.6,"rpg":4.5,"apg":6.1,"spg":1.7,"bpg":0.2,"fgp":45.7,"tpp":40.5},{"name":"Braylon Mullins","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":12.1,"rpg":3.5,"apg":1.5,"spg":1.1,"bpg":0.7,"fgp":43.5,"tpp":33.0},{"name":"Jayden Ross","pos":"F","height":"6-7","year":"Sr.","hasStats":true,"ppg":4.8,"rpg":2.4,"apg":0.9,"spg":0.8,"bpg":0.4,"fgp":52.2,"tpp":37.7},{"name":"Nikolas Khamenia","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":5.8,"rpg":3.4,"apg":1.1,"spg":0.6,"bpg":0.1,"fgp":43.8,"tpp":33.7},{"name":"Najai Hines","pos":"C","height":"6-10","year":"So.","hasStats":true,"ppg":6.5,"rpg":5.5,"apg":0.6,"spg":0.4,"bpg":2.2,"fgp":60.2,"tpp":0.0}]},{"name":"Providence","conf":"Big East","players":[{"name":"Malik Mack","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":13.6,"rpg":3.0,"apg":4.1,"spg":0.9,"bpg":0.1,"fgp":38.1,"tpp":29.8},{"name":"Devin Vanterpool","pos":"G","height":"6-4","year":"R-Jr.","hasStats":true,"ppg":15.8,"rpg":6.3,"apg":2.4,"spg":1.5,"bpg":0.8,"fgp":43.8,"tpp":35.1},{"name":"Miles Byrd","pos":"G","height":"6-6","year":"Gr.","hasStats":true,"ppg":10.4,"rpg":4.7,"apg":2.6,"spg":1.9,"bpg":1.2,"fgp":40.5,"tpp":30.8},{"name":"Dink Pate","pos":"G","height":"6-8","year":"Fr.","hasStats":false},{"name":"Arrinten Page","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":10.2,"rpg":4.5,"apg":1.8,"spg":0.9,"bpg":1.2,"fgp":54.6,"tpp":25.0}]},{"name":"Marquette","conf":"Big East","players":[{"name":"Nigel James Jr.","pos":"G","height":"6-0","year":"So.","hasStats":true,"ppg":16.4,"rpg":3.4,"apg":4.9,"spg":1.9,"bpg":0.3,"fgp":47.0,"tpp":34.7},{"name":"Adrien Stevens","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":7.9,"rpg":2.6,"apg":1.6,"spg":1.4,"bpg":0.2,"fgp":43.4,"tpp":37.5},{"name":"Nolan Minessale","pos":"F","height":"6-5","year":"Jr.","hasStats":true,"ppg":19.8,"rpg":4.6,"apg":4.3,"spg":1.6,"bpg":0.6,"fgp":50.6,"tpp":30.6},{"name":"Royce Parham","pos":"F","height":"6-9","year":"Jr.","hasStats":true,"ppg":12.5,"rpg":4.9,"apg":0.9,"spg":0.7,"bpg":0.8,"fgp":52.2,"tpp":33.3},{"name":"Sananda Fru","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":9.0,"rpg":6.1,"apg":1.2,"spg":0.5,"bpg":1.4,"fgp":75.3,"tpp":50.0}]},{"name":"Butler","conf":"Big East","players":[{"name":"Jalen Jackson","pos":"G","height":"6-2","year":"Gr.","hasStats":true,"ppg":9.5,"rpg":3.5,"apg":3.8,"spg":1.3,"bpg":0.2,"fgp":51.2,"tpp":40.0},{"name":"Jordan Ellerbee","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":13.1,"rpg":3.4,"apg":2.1,"spg":0.9,"bpg":0.1,"fgp":46.7,"tpp":35.3},{"name":"Asim Djulovic","pos":"F","height":"6-8","year":"Fr.","hasStats":false},{"name":"Treyson Anderson","pos":"F","height":"6-9","year":"Jr.","hasStats":true,"ppg":10.4,"rpg":5.3,"apg":0.8,"spg":0.4,"bpg":0.9,"fgp":50.0,"tpp":35.8},{"name":"Drayton Jones","pos":"C","height":"6-11","year":"Sr.","hasStats":true,"ppg":6.3,"rpg":4.6,"apg":1.4,"spg":0.4,"bpg":0.9,"fgp":58.6,"tpp":0.0}]},{"name":"Georgetown","conf":"Big East","players":[{"name":"Jaland Lowe","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":8.0,"rpg":2.1,"apg":2.4,"spg":0.7,"bpg":0.2,"fgp":35.8,"tpp":20.8},{"name":"Elmarko Jackson","pos":"G","height":"6-3","year":"R-Jr.","hasStats":true,"ppg":4.8,"rpg":1.8,"apg":1.4,"spg":0.7,"bpg":0.2,"fgp":38.1,"tpp":37.2},{"name":"Vyctorius Miller","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":10.8,"rpg":2.7,"apg":1.8,"spg":1.1,"bpg":0.2,"fgp":41.8,"tpp":37.5},{"name":"Caleb Williams","pos":"F","height":"6-7","year":"Jr.","hasStats":true,"ppg":8.8,"rpg":5.1,"apg":1.5,"spg":0.5,"bpg":0.2,"fgp":44.7,"tpp":37.7},{"name":"Chol Machot","pos":"C","height":"7-0","year":"Jr.","hasStats":true,"ppg":8.9,"rpg":5.5,"apg":0.2,"spg":0.4,"bpg":2.5,"fgp":59.2,"tpp":27.3}]},{"name":"Creighton","conf":"Big East","players":[{"name":"BJ Davis","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":10.8,"rpg":3.2,"apg":2.2,"spg":1.1,"bpg":0.1,"fgp":43.4,"tpp":37.4},{"name":"Wes Enis","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":20.1,"rpg":4.4,"apg":3.1,"spg":1.3,"bpg":0.1,"fgp":44.9,"tpp":41.1},{"name":"Jackson McAndrew","pos":"F","height":"6-10","year":"Jr.","hasStats":true,"ppg":6.8,"rpg":4.5,"apg":0.5,"spg":0.8,"bpg":0.3,"fgp":31.0,"tpp":28.6},{"name":"Jasen Green","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":10.2,"rpg":6.1,"apg":2.5,"spg":0.8,"bpg":0.8,"fgp":54.2,"tpp":35.8},{"name":"Oswin Erhunmwunse","pos":"C","height":"6-10","year":"Jr.","hasStats":true,"ppg":6.9,"rpg":8.3,"apg":0.8,"spg":0.3,"bpg":2.1,"fgp":67.3,"tpp":0.0}]},{"name":"Seton Hall","conf":"Big East","players":[{"name":"Del Jones","pos":"G","height":"6-2","year":"Jr.","hasStats":true,"ppg":17.2,"rpg":3.5,"apg":3.5,"spg":0.9,"bpg":0.3,"fgp":41.6,"tpp":30.9},{"name":"Simeon Wilcher","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":5.7,"rpg":1.7,"apg":1.7,"spg":0.7,"bpg":0.3,"fgp":37.1,"tpp":33.7},{"name":"Rodney Brown Jr.","pos":"G","height":"6-6","year":"Sr.","hasStats":true,"ppg":14.0,"rpg":2.4,"apg":1.7,"spg":0.7,"bpg":0.1,"fgp":42.5,"tpp":38.2},{"name":"Mayar Wol","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":10.5,"rpg":2.7,"apg":0.7,"spg":1.0,"bpg":0.4,"fgp":48.6,"tpp":39.1},{"name":"Devin Williams","pos":"F","height":"6-10","year":"R-Jr.","hasStats":true,"ppg":7.5,"rpg":5.2,"apg":1.3,"spg":0.2,"bpg":2.6,"fgp":51.0,"tpp":30.6}]},{"name":"St. John's","conf":"Big East","players":[{"name":"Quinn Ellis","pos":"G","height":"6-4","year":"??","hasStats":false},{"name":"Ian Jackson","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":9.6,"rpg":2.3,"apg":1.3,"spg":0.8,"bpg":0.2,"fgp":41.3,"tpp":35.3},{"name":"Tounde Yessoufou","pos":"F","height":"6-5","year":"So.","hasStats":true,"ppg":17.8,"rpg":5.8,"apg":1.6,"spg":2.0,"bpg":0.5,"fgp":46.9,"tpp":30.2},{"name":"Babacar Sane","pos":"F","height":"6-7","year":"??","hasStats":false},{"name":"Rub\u00e9n Prey","pos":"F","height":"6-11","year":"Jr.","hasStats":true,"ppg":4.1,"rpg":2.1,"apg":0.8,"spg":0.4,"bpg":0.7,"fgp":48.5,"tpp":55.0}]},{"name":"DePaul","conf":"Big East","players":[{"name":"Layden Blocker","pos":"G","height":"6-2","year":"Sr.","hasStats":true,"ppg":11.1,"rpg":2.5,"apg":3.5,"spg":1.6,"bpg":0.3,"fgp":36.0,"tpp":31.8},{"name":"Ade Popoola","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":10.7,"rpg":4.1,"apg":1.3,"spg":1.4,"bpg":0.3,"fgp":41.6,"tpp":41.2},{"name":"Koree Cotton","pos":"G","height":"6-6","year":"R-Jr.","hasStats":true,"ppg":13.9,"rpg":5.3,"apg":2.5,"spg":1.0,"bpg":1.2,"fgp":47.4,"tpp":40.3},{"name":"Magoon Gwath","pos":"F","height":"7-0","year":"R-Jr.","hasStats":true,"ppg":8.9,"rpg":4.3,"apg":0.3,"spg":0.4,"bpg":1.5,"fgp":51.9,"tpp":43.5},{"name":"Fabian Flores","pos":"C","height":"7-2","year":"Jr.","hasStats":true,"ppg":2.9,"rpg":2.9,"apg":0.3,"spg":0.3,"bpg":0.5,"fgp":68.1,"tpp":0.0}]},{"name":"Duke","conf":"ACC","players":[{"name":"Cayden Boozer","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":7.5,"rpg":2.2,"apg":2.9,"spg":0.8,"bpg":0.1,"fgp":49.5,"tpp":28.1},{"name":"John Blackwell","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":19.1,"rpg":5.1,"apg":2.3,"spg":1.1,"bpg":0.1,"fgp":43.0,"tpp":38.9},{"name":"Dame Sarr","pos":"G","height":"6-8","year":"So.","hasStats":true,"ppg":6.4,"rpg":3.8,"apg":1.1,"spg":1.0,"bpg":0.4,"fgp":39.5,"tpp":31.8},{"name":"Joaquim Boumtje-Boumtje","pos":"F","height":"6-11","year":"??","hasStats":false},{"name":"Patrick Ngongba","pos":"C","height":"6-11","year":"Jr.","hasStats":true,"ppg":10.5,"rpg":6.0,"apg":2.0,"spg":0.6,"bpg":1.1,"fgp":60.7,"tpp":27.6}]},{"name":"North Carolina","conf":"ACC","players":[{"name":"Terrence Brown","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":19.9,"rpg":2.4,"apg":3.8,"spg":1.4,"bpg":0.1,"fgp":45.3,"tpp":32.7},{"name":"Matt Able","pos":"G","height":"6-6","year":"So.","hasStats":true,"ppg":8.8,"rpg":3.4,"apg":0.9,"spg":1.2,"bpg":0.3,"fgp":41.6,"tpp":35.5},{"name":"Neoklis Avdalas","pos":"G","height":"6-9","year":"So.","hasStats":true,"ppg":12.1,"rpg":3.1,"apg":4.6,"spg":0.6,"bpg":0.5,"fgp":38.6,"tpp":31.4},{"name":"Jarin Stevenson","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":8.1,"rpg":4.4,"apg":0.9,"spg":0.6,"bpg":0.7,"fgp":47.0,"tpp":29.5},{"name":"Alex Samodurov","pos":"C","height":"7-0","year":"??","hasStats":false}]},{"name":"Notre Dame","conf":"ACC","players":[{"name":"Braeden Smith","pos":"G","height":"6-0","year":"Gr.","hasStats":true,"ppg":5.1,"rpg":2.2,"apg":3.6,"spg":1.0,"bpg":0.0,"fgp":46.7,"tpp":33.3},{"name":"Braeden Shrewsberry","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":11.9,"rpg":3.1,"apg":1.9,"spg":0.4,"bpg":0.1,"fgp":39.0,"tpp":40.2},{"name":"Ethan Roberts","pos":"G","height":"6-5","year":"Gr.","hasStats":true,"ppg":16.9,"rpg":3.9,"apg":2.3,"spg":1.0,"bpg":0.1,"fgp":40.1,"tpp":40.4},{"name":"Brady Koehler","pos":"F","height":"6-10","year":"So.","hasStats":true,"ppg":5.6,"rpg":3.2,"apg":0.3,"spg":0.7,"bpg":0.7,"fgp":45.2,"tpp":38.2},{"name":"Logan Duncomb","pos":"C","height":"6-10","year":"Gr.","hasStats":true,"ppg":18.3,"rpg":8.9,"apg":1.6,"spg":0.8,"bpg":0.8,"fgp":60.0,"tpp":0.0}]},{"name":"Virginia","conf":"ACC","players":[{"name":"Chance Mallory","pos":"G","height":"5-10","year":"So.","hasStats":true,"ppg":9.3,"rpg":3.7,"apg":3.4,"spg":1.6,"bpg":0.1,"fgp":42.2,"tpp":34.5},{"name":"Jurian Dixon","pos":"G","height":"6-4","year":"R-Jr.","hasStats":true,"ppg":15.9,"rpg":3.6,"apg":2.5,"spg":1.1,"bpg":0.1,"fgp":43.0,"tpp":38.5},{"name":"Sam Lewis","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":10.6,"rpg":3.6,"apg":1.4,"spg":0.8,"bpg":0.3,"fgp":45.5,"tpp":40.3},{"name":"Thijs de Ridder","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":15.6,"rpg":6.2,"apg":1.6,"spg":0.8,"bpg":0.5,"fgp":50.8,"tpp":35.7},{"name":"Johann Gr\u00fcnloh","pos":"F","height":"7-0","year":"So.","hasStats":true,"ppg":7.1,"rpg":5.2,"apg":0.6,"spg":0.4,"bpg":2.2,"fgp":53.3,"tpp":35.0}]},{"name":"GONE","conf":"ACC","players":[{"name":"Acaden Lewis","pos":"G","height":"6-2","year":"So.","hasStats":true,"ppg":12.2,"rpg":3.0,"apg":5.3,"spg":1.9,"bpg":0.1,"fgp":45.6,"tpp":27.0},{"name":"Dante Allen","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":6.6,"rpg":2.8,"apg":2.2,"spg":1.0,"bpg":0.1,"fgp":43.1,"tpp":32.1},{"name":"Shelton Henderson","pos":"F","height":"6-6","year":"So.","hasStats":true,"ppg":13.8,"rpg":4.9,"apg":2.1,"spg":1.1,"bpg":0.3,"fgp":56.7,"tpp":25.5},{"name":"Caleb Gaskins","pos":"F","height":"6-8","year":"Fr.","hasStats":false},{"name":"Somto Cyril","pos":"C","height":"6-11","year":"Jr.","hasStats":true,"ppg":9.3,"rpg":5.4,"apg":0.6,"spg":0.6,"bpg":2.2,"fgp":75.9,"tpp":0.0}]},{"name":"NC State","conf":"ACC","players":[{"name":"Preston Edmead","pos":"G","height":"6-1","year":"So.","hasStats":true,"ppg":16.1,"rpg":3.5,"apg":4.4,"spg":0.5,"bpg":0.0,"fgp":40.1,"tpp":38.7},{"name":"Christian Hammond","pos":"G","height":"6-4","year":"R-Jr.","hasStats":true,"ppg":15.6,"rpg":3.0,"apg":2.5,"spg":1.2,"bpg":0.1,"fgp":48.4,"tpp":39.3},{"name":"Paul McNeil Jr.","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":13.8,"rpg":3.6,"apg":0.8,"spg":0.6,"bpg":0.4,"fgp":43.3,"tpp":42.7},{"name":"Eemeli Yalaho","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":10.1,"rpg":5.7,"apg":1.7,"spg":0.5,"bpg":0.3,"fgp":47.0,"tpp":39.8},{"name":"Kyle Evans","pos":"F","height":"6-10","year":"Gr.","hasStats":true,"ppg":12.1,"rpg":8.7,"apg":0.9,"spg":0.4,"bpg":3.3,"fgp":62.0,"tpp":20.0}]},{"name":"Syracuse","conf":"ACC","players":[{"name":"Garwey Dual","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":8.4,"rpg":2.9,"apg":4.4,"spg":1.6,"bpg":0.6,"fgp":45.6,"tpp":31.6},{"name":"Aiden Tobiason","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":15.3,"rpg":3.7,"apg":2.0,"spg":1.2,"bpg":0.2,"fgp":48.0,"tpp":33.8},{"name":"Gavin Doty","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":18.0,"rpg":6.9,"apg":2.2,"spg":1.3,"bpg":0.1,"fgp":45.8,"tpp":32.6},{"name":"Sadiq White Jr.","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":6.1,"rpg":3.3,"apg":0.4,"spg":0.5,"bpg":0.6,"fgp":54.7,"tpp":36.8},{"name":"Abdramane Siby","pos":"F","height":"7-0","year":"Fr.","hasStats":false}]},{"name":"Louisville","conf":"ACC","players":[{"name":"Jackson Shelstad","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":15.6,"rpg":2.9,"apg":4.9,"spg":1.4,"bpg":0.1,"fgp":39.1,"tpp":31.4},{"name":"Adrian Wooley","pos":"G","height":"6-4","year":"Jr.","hasStats":true,"ppg":8.7,"rpg":3.9,"apg":1.8,"spg":0.7,"bpg":0.1,"fgp":45.0,"tpp":35.0},{"name":"Karter Knox","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":8.1,"rpg":4.5,"apg":1.2,"spg":0.7,"bpg":0.5,"fgp":46.0,"tpp":37.7},{"name":"Alvaro Folgueiras","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":8.5,"rpg":3.8,"apg":2.3,"spg":0.8,"bpg":0.2,"fgp":49.3,"tpp":32.7},{"name":"Flory Bidunga","pos":"F","height":"6-9","year":"Jr.","hasStats":true,"ppg":13.3,"rpg":9.0,"apg":1.5,"spg":0.7,"bpg":2.6,"fgp":64.0,"tpp":0.0}]},{"name":"Florida St.","conf":"ACC","players":[{"name":"Anthony Robinson II","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":8.9,"rpg":3.1,"apg":3.0,"spg":1.6,"bpg":0.3,"fgp":41.0,"tpp":31.4},{"name":"Kameron Taylor","pos":"G","height":"6-7","year":"Jr.","hasStats":true,"ppg":18.9,"rpg":5.0,"apg":3.0,"spg":0.8,"bpg":0.7,"fgp":45.3,"tpp":28.1},{"name":"Shon Abaev","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":7.0,"rpg":2.9,"apg":1.1,"spg":0.4,"bpg":0.2,"fgp":33.5,"tpp":25.7},{"name":"Sebastian Rancik","pos":"F","height":"6-11","year":"Jr.","hasStats":true,"ppg":12.3,"rpg":5.6,"apg":2.0,"spg":0.9,"bpg":0.5,"fgp":40.4,"tpp":33.1},{"name":"Cooper Schwieger","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":5.1,"rpg":2.5,"apg":0.9,"spg":0.5,"bpg":0.6,"fgp":50.4,"tpp":34.3}]},{"name":"Georgia Tech","conf":"ACC","players":[{"name":"Colby Garland","pos":"G","height":"6-0","year":"Sr.","hasStats":true,"ppg":20.3,"rpg":3.3,"apg":4.6,"spg":1.1,"bpg":0.0,"fgp":49.0,"tpp":37.2},{"name":"Courtland Muldrew","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":3.3,"rpg":1.9,"apg":1.5,"spg":0.3,"bpg":0.2,"fgp":42.4,"tpp":21.1},{"name":"Kam Craft","pos":"G","height":"6-6","year":"R-Sr.","hasStats":true,"ppg":7.3,"rpg":2.1,"apg":0.9,"spg":0.4,"bpg":0.3,"fgp":37.8,"tpp":36.4},{"name":"Victor Valdes","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":14.8,"rpg":4.0,"apg":4.5,"spg":1.4,"bpg":0.4,"fgp":40.4,"tpp":24.4},{"name":"Cole Kirouac","pos":"F","height":"7-0","year":"So.","hasStats":true,"ppg":1.7,"rpg":2.3,"apg":0.3,"spg":0.3,"bpg":0.3,"fgp":63.3,"tpp":0.0}]},{"name":"Wake Forest","conf":"ACC","players":[{"name":"Kevair Kennedy","pos":"G","height":"6-2","year":"So.","hasStats":true,"ppg":18.4,"rpg":4.6,"apg":4.2,"spg":1.9,"bpg":0.1,"fgp":45.1,"tpp":32.5},{"name":"Justin Ray","pos":"G","height":"6-3","year":"Jr.","hasStats":true,"ppg":11.3,"rpg":2.1,"apg":1.2,"spg":1.1,"bpg":0.1,"fgp":43.9,"tpp":42.0},{"name":"Jamari McDowell","pos":"G","height":"6-5","year":"R-Jr.","hasStats":true,"ppg":3.3,"rpg":1.6,"apg":1.1,"spg":0.4,"bpg":0.1,"fgp":36.0,"tpp":34.9},{"name":"Xander Pintelon","pos":"F","height":"6-11","year":"Sr.","hasStats":true,"ppg":6.2,"rpg":3.7,"apg":0.7,"spg":0.5,"bpg":0.5,"fgp":40.4,"tpp":35.2},{"name":"Antonio Dorn","pos":"C","height":"7-0","year":"So.","hasStats":true,"ppg":2.6,"rpg":1.8,"apg":0.4,"spg":0.1,"bpg":0.2,"fgp":64.3,"tpp":0.0}]},{"name":"Virginia Tech","conf":"ACC","players":[{"name":"Ben Hammond","pos":"G","height":"5-11","year":"Jr.","hasStats":true,"ppg":13.2,"rpg":2.3,"apg":3.2,"spg":2.0,"bpg":0.1,"fgp":43.8,"tpp":43.1},{"name":"Jaylen Curry","pos":"G","height":"6-1","year":"Sr.","hasStats":true,"ppg":10.1,"rpg":3.2,"apg":3.5,"spg":1.2,"bpg":0.1,"fgp":41.8,"tpp":31.6},{"name":"Tyler Johnson","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":8.0,"rpg":4.5,"apg":1.6,"spg":1.1,"bpg":0.6,"fgp":53.3,"tpp":41.5},{"name":"Kuol Atak","pos":"F","height":"6-9","year":"R-So.","hasStats":true,"ppg":7.0,"rpg":1.2,"apg":0.2,"spg":0.1,"bpg":0.4,"fgp":47.3,"tpp":42.7},{"name":"Amani Hansberry","pos":"F","height":"6-8","year":"Sr.","hasStats":true,"ppg":14.3,"rpg":7.4,"apg":2.4,"spg":1.5,"bpg":0.7,"fgp":49.2,"tpp":35.4}]},{"name":"Pittsburgh","conf":"ACC","players":[{"name":"Naithan George","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":10.9,"rpg":3.0,"apg":5.4,"spg":1.5,"bpg":0.3,"fgp":40.5,"tpp":29.3},{"name":"Jalil Bethea","pos":"G","height":"6-5","year":"Jr.","hasStats":true,"ppg":4.0,"rpg":1.7,"apg":0.6,"spg":0.2,"bpg":0.1,"fgp":37.5,"tpp":31.4},{"name":"Jonathan Powell","pos":"G","height":"6-6","year":"Jr.","hasStats":true,"ppg":4.8,"rpg":2.4,"apg":0.7,"spg":0.5,"bpg":0.1,"fgp":38.1,"tpp":36.5},{"name":"Baye Ndongo","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":11.8,"rpg":8.1,"apg":2.4,"spg":0.8,"bpg":1.0,"fgp":55.6,"tpp":35.7},{"name":"Armani Mighty","pos":"C","height":"6-10","year":"R-Sr.","hasStats":true,"ppg":13.2,"rpg":10.6,"apg":1.1,"spg":0.7,"bpg":1.7,"fgp":64.5,"tpp":0.0}]},{"name":"Boston College","conf":"ACC","players":[{"name":"Money Williams","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":20.6,"rpg":4.3,"apg":4.7,"spg":0.9,"bpg":0.3,"fgp":49.3,"tpp":34.0},{"name":"Ernest Shelton","pos":"G","height":"6-5","year":"Sr.","hasStats":true,"ppg":15.9,"rpg":3.1,"apg":0.9,"spg":1.2,"bpg":0.5,"fgp":38.6,"tpp":34.6},{"name":"Jacob Furphy","pos":"G","height":"6-5","year":"So.","hasStats":true,"ppg":0.4,"rpg":0.1,"apg":0.0,"spg":0.1,"bpg":0.0,"fgp":42.9,"tpp":0.0},{"name":"Brandon Benjamin (Fairfield)","pos":"F","height":"6-8","year":"So.","hasStats":true,"ppg":14.2,"rpg":10.4,"apg":1.2,"spg":0.7,"bpg":1.6,"fgp":56.5,"tpp":25.0},{"name":"Luke Hunger","pos":"F","height":"6-10","year":"Gr.","hasStats":true,"ppg":8.4,"rpg":5.1,"apg":0.9,"spg":0.2,"bpg":0.1,"fgp":49.2,"tpp":31.1}]},{"name":"Clemson","conf":"ACC","players":[{"name":"Ace Buckner","pos":"G","height":"6-3","year":"R-So.","hasStats":true,"ppg":8.3,"rpg":2.9,"apg":1.8,"spg":0.8,"bpg":0.1,"fgp":42.9,"tpp":31.2},{"name":"Zac Foster","pos":"G","height":"6-4","year":"So.","hasStats":true,"ppg":6.9,"rpg":2.8,"apg":2.5,"spg":0.4,"bpg":0.3,"fgp":31.0,"tpp":27.7},{"name":"Liutauras Lelevicius","pos":"G","height":"6-7","year":"Jr.","hasStats":true,"ppg":8.0,"rpg":3.4,"apg":0.7,"spg":0.5,"bpg":0.1,"fgp":45.7,"tpp":38.0},{"name":"David Fuchs","pos":"F","height":"6-9","year":"Sr.","hasStats":true,"ppg":12.7,"rpg":7.8,"apg":1.4,"spg":0.5,"bpg":0.3,"fgp":51.7,"tpp":30.3},{"name":"Dylan Faulkner","pos":"F","height":"6-10","year":"Sr.","hasStats":true,"ppg":17.2,"rpg":8.6,"apg":1.8,"spg":0.6,"bpg":1.5,"fgp":61.7,"tpp":0.0}]},{"name":"Stanford","conf":"ACC","players":[{"name":"Christian Bliss","pos":"G","height":"6-4","year":"R-So.","hasStats":true,"ppg":16.7,"rpg":5.2,"apg":5.9,"spg":1.8,"bpg":0.1,"fgp":42.4,"tpp":39.2},{"name":"Julius Price","pos":"G","height":"6-2","year":"Fr.","hasStats":false},{"name":"Aziz Olajuwon","pos":"F","height":"6-7","year":"Fr.","hasStats":false},{"name":"Donavin Young","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":2.7,"rpg":2.7,"apg":0.7,"spg":0.5,"bpg":0.9,"fgp":40.0,"tpp":30.8},{"name":"Aidan Cammann","pos":"F","height":"6-10","year":"R-Jr.","hasStats":true,"ppg":6.3,"rpg":3.8,"apg":1.4,"spg":1.0,"bpg":0.4,"fgp":47.7,"tpp":23.7}]},{"name":"California","conf":"ACC","players":[{"name":"Semetri (TT) Carr","pos":"G","height":"6-0","year":"So.","hasStats":true,"ppg":3.8,"rpg":2.6,"apg":2.2,"spg":0.4,"bpg":0.1,"fgp":36.1,"tpp":25.7},{"name":"Jordan Ross","pos":"G","height":"6-3","year":"Sr.","hasStats":true,"ppg":6.7,"rpg":2.5,"apg":2.3,"spg":0.7,"bpg":0.0,"fgp":42.0,"tpp":31.0},{"name":"Michael Cooper","pos":"G","height":"6-3","year":"So.","hasStats":true,"ppg":13.4,"rpg":2.7,"apg":2.2,"spg":0.6,"bpg":0.2,"fgp":44.3,"tpp":35.6},{"name":"Jake Wilkins","pos":"F","height":"6-9","year":"So.","hasStats":true,"ppg":4.9,"rpg":1.8,"apg":0.4,"spg":0.6,"bpg":0.4,"fgp":46.6,"tpp":21.1},{"name":"Lee Dort","pos":"F","height":"6-10","year":"Gr.","hasStats":true,"ppg":8.1,"rpg":7.8,"apg":0.9,"spg":0.4,"bpg":0.9,"fgp":59.7,"tpp":0.0}]},{"name":"SMU","conf":"ACC","players":[{"name":"David Terrell Jr.","pos":"G","height":"6-4","year":"Sr.","hasStats":true,"ppg":13.5,"rpg":3.7,"apg":4.8,"spg":1.7,"bpg":0.3,"fgp":43.0,"tpp":25.7},{"name":"Rowan Brumbaugh","pos":"G","height":"6-4","year":"R-Sr.","hasStats":true,"ppg":19.2,"rpg":4.9,"apg":3.5,"spg":1.6,"bpg":0.2,"fgp":45.2,"tpp":36.0},{"name":"Jaylin Stewart","pos":"G","height":"6-7","year":"Sr.","hasStats":true,"ppg":4.5,"rpg":2.8,"apg":1.2,"spg":0.5,"bpg":0.3,"fgp":44.8,"tpp":34.7},{"name":"Nic Codie","pos":"F","height":"6-8","year":"Jr.","hasStats":true,"ppg":4.1,"rpg":3.1,"apg":0.7,"spg":0.1,"bpg":0.6,"fgp":48.1,"tpp":7.7},{"name":"Jaden Toombs","pos":"C","height":"6-11","year":"So.","hasStats":true,"ppg":8.3,"rpg":4.6,"apg":1.1,"spg":0.5,"bpg":0.6,"fgp":56.8,"tpp":23.1}]}];

const SLOTS = ["PG","SG","SF","PF","C","Bench"];
const CONF_COLORS = {"Big Ten":"#003087","Big 12":"#00338D","SEC":"#004B8D","Big East":"#1B4D8E","ACC":"#003865"};

function StatBar({label, value, max, color="#F5A623"}) {
  const [w, setW] = useState(0);
  useEffect(() => { setTimeout(() => setW(Math.min((value/max)*100,100)), 50); }, [value]);
  return (
    <div style={{marginBottom:5}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
        <span style={{color:"#555",fontSize:10,letterSpacing:1}}>{label}</span>
        <span style={{color:"#C4C4C4",fontSize:11,fontFamily:"'Bebas Neue',sans-serif"}}>{value}%</span>
      </div>
      <div style={{height:3,background:"#1A1A1A",borderRadius:2}}>
        <div style={{height:"100%",width:`${w}%`,background:color,borderRadius:2,transition:"width 0.5s ease"}}/>
      </div>
    </div>
  );
}

function PlayerCard({player, team, slot, onRemove, draggable, onDragStart}) {
  return (
    <div draggable={draggable} onDragStart={onDragStart}
      style={{background:"#111",border:"1px solid #222",borderRadius:14,padding:"16px",cursor:draggable?"grab":"default",userSelect:"none",transition:"border-color 0.2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <span style={{background:"#F5A623",color:"#0A0A0A",fontSize:9,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1.5,padding:"2px 7px",borderRadius:4}}>{slot}</span>
            {draggable && <span style={{color:"#2A2A2A",fontSize:14}}>⠿</span>}
          </div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:1.5,color:"white",lineHeight:1}}>{player.name}</div>
          <div style={{color:"#555",fontSize:12,marginTop:3}}>{player.pos} · {player.height} · <span style={{color:"#444"}}>{team}</span></div>
        </div>
        {onRemove && (
          <button onClick={onRemove} style={{background:"none",border:"1px solid #1A1A1A",color:"#444",cursor:"pointer",fontSize:14,padding:"3px 8px",borderRadius:6,lineHeight:1,marginLeft:8}}>✕</button>
        )}
      </div>
      {player.hasStats ? (
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12,textAlign:"center",background:"#0D0D0D",borderRadius:8,padding:"10px 8px"}}>
            {[["PPG",player.ppg],["RPG",player.rpg],["APG",player.apg],["SPG",player.spg],["BPG",player.bpg]].map(([l,v])=>(
              <div key={l}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#F5A623",lineHeight:1}}>{v}</div>
                <div style={{color:"#444",fontSize:10,letterSpacing:1,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            <StatBar label="FG%" value={player.fgp} max={75}/>
            <StatBar label="3P%" value={player.tpp} max={55} color="#60a5fa"/>
            <StatBar label="FT%" value={player.ftp||0} max={100} color="#a78bfa"/>
          </div>
        </>
      ) : (
        <div style={{background:"#0D0D0D",borderRadius:8,padding:"10px",textAlign:"center",color:"#333",fontSize:12,letterSpacing:1}}>
          {player.note || "FRESHMAN / NO STATS YET"}
        </div>
      )}
    </div>
  );
}

function PickCard({player, onClick}) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"#161616":"#111",border:`1px solid ${hov?"#F5A623":"#1A1A1A"}`,borderRadius:12,padding:"14px 16px",cursor:"pointer",color:"white",textAlign:"left",width:"100%",transition:"all 0.15s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom: player.hasStats ? 10 : 0}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:2,lineHeight:1}}>{player.name}</div>
          <div style={{color:"#555",fontSize:12,marginTop:2}}>{player.pos} · {player.height}{player.year ? ` · ${player.year}` : ''}</div>
          {player.note && <div style={{color:"#F5A623",fontSize:11,marginTop:2}}>{player.note}</div>}
        </div>
        {player.hasStats && (
          <div style={{display:"flex",gap:12,textAlign:"center",flexShrink:0}}>
            {[["PPG",player.ppg],["RPG",player.rpg],["APG",player.apg]].map(([l,v])=>(
              <div key={l}>
                <div style={{color:"#F5A623",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,lineHeight:1}}>{v}</div>
                <div style={{color:"#555",fontSize:10,letterSpacing:1}}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {player.hasStats && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:10}}>
          <StatBar label="FG%" value={player.fgp} max={75}/>
          <StatBar label="3P%" value={player.tpp} max={55} color="#60a5fa"/>
          <StatBar label="FT%" value={player.ftp||0} max={100} color="#a78bfa"/>
        </div>
      )}
    </button>
  );
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [remaining, setRemaining] = useState([...TEAMS]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [squad, setSquad] = useState(Array(6).fill(null));
  const [spinDisplay, setSpinDisplay] = useState(null);
  const [result, setResult] = useState(null);
  const [simStep, setSimStep] = useState(0);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [pickingForSlot, setPickingForSlot] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  const filledCount = squad.filter(Boolean).length;
  const nextEmptySlot = squad.findIndex(s => !s);

  const goTo = (p) => {
    setFadeIn(false);
    setTimeout(() => { setPhase(p); setFadeIn(true); }, 150);
  };

  useEffect(() => { setFadeIn(true); }, []);

  const spinForTeam = (forSlot = null) => {
    if(forSlot !== null) setPickingForSlot(forSlot);
    goTo("spinning");
    let count = 0;
    const spins = 22 + Math.floor(Math.random()*10);
    const iv = setInterval(() => {
      setSpinDisplay(remaining[Math.floor(Math.random()*remaining.length)]);
      count++;
      if(count >= spins) {
        clearInterval(iv);
        const picked = remaining[Math.floor(Math.random()*remaining.length)];
        setCurrentTeam(picked);
        setSpinDisplay(picked);
        setTimeout(() => goTo("picking"), 400);
      }
    }, 70);
  };

  const pickPlayer = (player) => {
    const slotIdx = pickingForSlot !== null ? pickingForSlot : nextEmptySlot;
    const newSquad = [...squad];
    newSquad[slotIdx] = {...player, team: currentTeam.name, conf: currentTeam.conf, slot: SLOTS[slotIdx]};
    const newRemaining = remaining.filter(t => t.name !== currentTeam.name);
    setSquad(newSquad);
    setRemaining(newRemaining);
    setCurrentTeam(null);
    setPickingForSlot(null);
    goTo(newSquad.filter(Boolean).length >= 6 ? "done" : "ready");
  };

  const removeFromSlot = (idx) => {
    const p = squad[idx];
    if(!p) return;
    const team = TEAMS.find(t => t.name === p.team);
    if(team) setRemaining(prev => [...prev, team]);
    const newSquad = [...squad];
    newSquad[idx] = null;
    setSquad(newSquad);
    if(phase === "done") goTo("ready");
  };

  const onDragStart = (idx) => setDragIdx(idx);
  const onDragOver = (e, idx) => { e.preventDefault(); setDragOver(idx); };
  const onDrop = (idx) => {
    if(dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOver(null); return; }
    const newSquad = [...squad];
    [newSquad[dragIdx], newSquad[idx]] = [newSquad[idx], newSquad[dragIdx]];
    newSquad.forEach((p,i) => { if(p) p.slot = SLOTS[i]; });
    setSquad(newSquad);
    setDragIdx(null);
    setDragOver(null);
  };

  const SIM_STEPS = ["Scheduling the season...","Running the regular season...","Conference tournaments...","Selection Sunday...","Simulating March..."];

  const simulate = async () => {
    goTo("simulating");
    let step = 0;
    setSimStep(0);
    const iv = setInterval(() => {
      step++;
      if(step < SIM_STEPS.length) setSimStep(step);
    }, 900);

    const squadStr = squad.filter(Boolean).map(p =>
      `${p.slot}: ${p.name} (${p.pos}, ${p.team}) — ` +
      (p.hasStats ? `${p.ppg} PPG, ${p.rpg} RPG, ${p.apg} APG, ${p.spg} SPG, ${p.bpg} BPG, FG%: ${p.fgp}, 3P%: ${p.tpp}` : 'Freshman/no stats')
    ).join('\n');

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          messages: [{
            role: "user",
            content: `You are a college basketball analyst. A user built a 6-player squad picking one player from random major conference teams. Simulate their season realistically.

Squad:
${squadStr}

Generate:
1. Realistic W-L record (~35 games) based on squad quality and balance
2. Did they make the NCAA Tournament?
3. If yes: seed (1-16) and game-by-game tournament results
4. Season MVP from their squad
5. Bold newspaper headline
6. 3-4 sentences of sharp analysis mentioning specific players by name

Consider position fit, scoring balance, rebounding, playmaking, defense. Freshmen with no stats are wildcards. Be realistic.

Respond ONLY in JSON (no markdown):
{"record":"24-11","madetournament":true,"seed":7,"tournamentRun":[{"round":"Round of 64","opponent":"Team Name","result":"W","score":"78-71"}],"exitRound":"Round of 32","mvp":"Player Name","headline":"HEADLINE","analysis":"...","grade":"B+"}`
          }]
        })
      });
      clearInterval(iv);
      const data = await res.json();
      const parsed = JSON.parse(data.content[0].text.replace(/```json|```/g,"").trim());
      setResult(parsed);
      goTo("result");
    } catch(e) {
      clearInterval(iv);
      setResult({record:"18-17",madetournament:false,seed:null,tournamentRun:[],exitRound:null,mvp:squad.filter(Boolean)[0]?.name,headline:"A SEASON TO FORGET",analysis:"This squad had issues all year long.",grade:"C-"});
      goTo("result");
    }
  };

  const reset = () => {
    setSquad(Array(6).fill(null));
    setRemaining([...TEAMS]);
    setCurrentTeam(null);
    setSpinDisplay(null);
    setResult(null);
    setPickingForSlot(null);
    goTo("intro");
  };

  const gc = (g) => {
    if(!g) return "#F5A623";
    if(g.startsWith("A")) return "#22c55e";
    if(g.startsWith("B")) return "#F5A623";
    if(g.startsWith("C")) return "#f97316";
    return "#ef4444";
  };

  const wrapStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  };

  return (
    <div style={{minHeight:"100vh",background:"#0A0A0A",fontFamily:"'Barlow Condensed',sans-serif",color:"white"}}>
      <div style={{maxWidth:720,margin:"0 auto",padding:"2rem 1rem"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"1.8rem"}}>
          <div style={{display:"inline-block",background:"#F5A623",borderRadius:6,padding:"2px 10px",marginBottom:8}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:3,color:"#0A0A0A"}}>FIELD OF 68</span>
          </div>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(2.4rem,8vw,4.5rem)",letterSpacing:4,margin:"0 0 4px",lineHeight:1}}>THE 40-0 CHALLENGE</h1>
          <p style={{color:"#555",fontSize:14,margin:0}}>Spin for a team. Pick a player. Build your roster. Go undefeated.</p>
        </div>

        <div style={wrapStyle}>

        {/* INTRO */}
        {phase==="intro" && (
          <div>
            <div style={{background:"#111",border:"1px solid #1A1A1A",borderRadius:14,padding:"1.5rem",marginBottom:"1.2rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:"1.2rem"}}>
                {[["🎰","Spin","Get a random major conf team"],["🏀","Pick","PG · SG · SF · PF · C · Bench"],["🏆","Simulate","Full season + March Madness"]].map(([icon,t,d])=>(
                  <div key={t} style={{textAlign:"center"}}>
                    <div style={{fontSize:28,marginBottom:4}}>{icon}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:"#F5A623"}}>{t}</div>
                    <div style={{color:"#555",fontSize:12}}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid #1A1A1A",paddingTop:12,color:"#444",fontSize:13,textAlign:"center"}}>
                {TEAMS.length} teams · Real 2025-26 stats · Drag to rearrange
              </div>
            </div>
            <button onClick={()=>goTo("ready")} style={{width:"100%",background:"#F5A623",color:"#0A0A0A",border:"none",borderRadius:10,padding:"15px",fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,cursor:"pointer"}}>
              START BUILDING
            </button>
          </div>
        )}

        {/* READY / DONE */}
        {(phase==="ready"||phase==="done") && (
          <div>
            <div style={{background:"#111",border:"1px solid #1A1A1A",borderRadius:14,padding:"1.2rem",marginBottom:"1rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{color:"#555",fontSize:12,letterSpacing:1}}>YOUR LINEUP</span>
                <span style={{color:"#F5A623",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2}}>{filledCount}/6</span>
              </div>
              <div style={{display:"flex",gap:6}}>
                {SLOTS.map((s,i)=>(
                  <div key={s} style={{flex:1,textAlign:"center"}}>
                    <div style={{height:3,borderRadius:2,background:squad[i]?"#F5A623":i===nextEmptySlot?"rgba(245,166,35,0.3)":"#1A1A1A",marginBottom:4,transition:"background 0.3s"}}/>
                    <div style={{fontSize:10,color:squad[i]?"#F5A623":i===nextEmptySlot?"rgba(245,166,35,0.5)":"#333",letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad */}
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"1rem"}}>
              {SLOTS.map((s,i) => squad[i] ? (
                <div key={i} onDragOver={e=>onDragOver(e,i)} onDrop={()=>onDrop(i)}
                  style={{opacity:dragOver===i?0.5:1,transform:dragOver===i?"scale(0.98)":"scale(1)",transition:"all 0.15s"}}>
                  <PlayerCard player={squad[i]} team={squad[i].team} slot={s} onRemove={()=>removeFromSlot(i)} draggable onDragStart={()=>onDragStart(i)}/>
                </div>
              ) : (
                <div key={i} onDragOver={e=>onDragOver(e,i)} onDrop={()=>onDrop(i)}
                  style={{border:"1px dashed #1A1A1A",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",opacity:dragOver===i?0.5:1,transition:"all 0.15s"}}>
                  <span style={{color:"#2A2A2A",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2}}>{s} — EMPTY</span>
                  {phase==="ready" && i===nextEmptySlot && (
                    <span style={{color:"#333",fontSize:12,letterSpacing:1}}>← next pick</span>
                  )}
                  {phase==="done" && (
                    <button onClick={()=>spinForTeam(i)} style={{background:"none",border:"1px solid #2A2A2A",borderRadius:6,color:"#555",padding:"4px 12px",fontSize:12,cursor:"pointer",letterSpacing:1,fontFamily:"'Bebas Neue',sans-serif"}}>SPIN</button>
                  )}
                </div>
              ))}
            </div>

            {phase==="ready" && nextEmptySlot !== -1 && (
              <button onClick={()=>spinForTeam()} style={{width:"100%",background:"#F5A623",color:"#0A0A0A",border:"none",borderRadius:10,padding:"15px",fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,cursor:"pointer"}}>
                🎰 SPIN FOR {SLOTS[nextEmptySlot]}
              </button>
            )}
            {phase==="done" && (
              <button onClick={simulate} style={{width:"100%",background:"#F5A623",color:"#0A0A0A",border:"none",borderRadius:10,padding:"15px",fontFamily:"'Bebas Neue',sans-serif",fontSize:24,letterSpacing:3,cursor:"pointer"}}>
                🏆 SIMULATE THE SEASON
              </button>
            )}
          </div>
        )}

        {/* SPINNING */}
        {phase==="spinning" && spinDisplay && (
          <div style={{textAlign:"center"}}>
            <div style={{background:"#111",border:`2px solid ${CONF_COLORS[spinDisplay.conf]||"#333"}`,borderRadius:16,padding:"3.5rem 1.5rem",transition:"border-color 0.07s"}}>
              <div style={{color:"#444",fontSize:12,letterSpacing:3,marginBottom:20,fontFamily:"'Bebas Neue',sans-serif"}}>
                {pickingForSlot !== null ? `REPLACING ${SLOTS[pickingForSlot]}` : `PICKING ${SLOTS[nextEmptySlot] || "PLAYER"}`}
              </div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(2.5rem,9vw,5rem)",letterSpacing:4,lineHeight:1,marginBottom:10}}>{spinDisplay.name}</div>
              <div style={{color:"#F5A623",fontSize:14,letterSpacing:3}}>{spinDisplay.conf}</div>
            </div>
          </div>
        )}

        {/* PICKING */}
        {phase==="picking" && currentTeam && (
          <div>
            <div style={{background:"#111",border:`2px solid ${CONF_COLORS[currentTeam.conf]||"#333"}`,borderRadius:14,padding:"1.2rem",marginBottom:"1rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,letterSpacing:3,lineHeight:1}}>{currentTeam.name}</div>
                  <div style={{color:"#F5A623",fontSize:13,letterSpacing:2,marginTop:2}}>{currentTeam.conf}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:"#333",fontSize:11,letterSpacing:1}}>PICK YOUR</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:"#F5A623",letterSpacing:2}}>{pickingForSlot !== null ? SLOTS[pickingForSlot] : SLOTS[nextEmptySlot]}</div>
                </div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {currentTeam.players.map(player=>(
                <PickCard key={player.name} player={player} onClick={()=>pickPlayer(player)}/>
              ))}
            </div>
          </div>
        )}

        {/* SIMULATING */}
        {phase==="simulating" && (
          <div style={{textAlign:"center",padding:"5rem 0"}}>
            <div style={{marginBottom:24}}>
              {[0,1,2,3,4].map(i=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",marginBottom:8,opacity:simStep>=i?1:0.2,transition:"opacity 0.4s"}}>
                  <span style={{color:simStep>i?"#22c55e":simStep===i?"#F5A623":"#333",fontSize:16,transition:"color 0.3s"}}>{simStep>i?"✓":"○"}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:simStep>=i?"#C4C4C4":"#333"}}>{SIM_STEPS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase==="result" && result && (
          <div>
            <div style={{background:"#111",border:`2px solid ${gc(result.grade)}`,borderRadius:14,padding:"1.5rem",marginBottom:"1rem",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(1.6rem,5vw,2.8rem)",letterSpacing:3,lineHeight:1.1,marginBottom:14}}>{result.headline}</div>
              <div style={{display:"flex",justifyContent:"center",gap:28,marginBottom:16}}>
                {[["RECORD",result.record,"#F5A623"],["GRADE",result.grade,gc(result.grade)],...(result.seed?[["SEED",`#${result.seed}`,"#60a5fa"]]:[])]
                  .map(([l,v,c])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:c,lineHeight:1}}>{v}</div>
                    <div style={{color:"#444",fontSize:11,letterSpacing:1}}>{l}</div>
                  </div>
                ))}
              </div>
              <p style={{color:"#C4C4C4",fontSize:15,lineHeight:1.6,margin:0,textAlign:"left"}}>{result.analysis}</p>
            </div>

            {result.madetournament && result.tournamentRun?.length>0 && (
              <div style={{background:"#111",border:"1px solid #1A1A1A",borderRadius:14,padding:"1.2rem",marginBottom:"1rem"}}>
                <div style={{color:"#444",fontSize:11,letterSpacing:2,marginBottom:12,fontFamily:"'Bebas Neue',sans-serif"}}>TOURNAMENT RUN</div>
                {result.tournamentRun.map((g,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<result.tournamentRun.length-1?"1px solid #1A1A1A":"none"}}>
                    <div>
                      <div style={{color:"#444",fontSize:11,letterSpacing:1}}>{g.round}</div>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:1}}>vs. {g.opponent}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{color:"#555",fontSize:14}}>{g.score}</span>
                      <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:g.result==="W"?"#22c55e":"#ef4444",letterSpacing:2}}>{g.result==="W"?"WIN":"LOSS"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!result.madetournament && (
              <div style={{background:"#111",border:"1px solid #1A1A1A",borderRadius:14,padding:"1.5rem",marginBottom:"1rem",textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:8}}>😬</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,color:"#ef4444"}}>MISSED THE TOURNAMENT</div>
                <div style={{color:"#444",fontSize:14,marginTop:6}}>Your squad didn't make the cut this year.</div>
              </div>
            )}

            {result.mvp && (
              <div style={{background:"#111",border:"1px solid #F5A623",borderRadius:12,padding:"14px 18px",marginBottom:"1rem",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:26}}>⭐</span>
                <div>
                  <div style={{color:"#444",fontSize:11,letterSpacing:2,fontFamily:"'Bebas Neue',sans-serif"}}>SEASON MVP</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:2,color:"#F5A623"}}>{result.mvp}</div>
                </div>
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"1rem"}}>
              {squad.filter(Boolean).map((p,i)=>(
                <PlayerCard key={i} player={p} team={p.team} slot={p.slot}/>
              ))}
            </div>

            <button onClick={reset} style={{width:"100%",background:"#1A1A1A",color:"white",border:"1px solid #222",borderRadius:10,padding:"13px",fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:3,cursor:"pointer"}}>
              PLAY AGAIN
            </button>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
